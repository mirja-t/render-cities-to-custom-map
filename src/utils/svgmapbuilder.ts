import { City, Bounds } from "../types";

export class SvgMapBuilder {
    west: number;
    south: number;
    east: number;
    north: number;
    scale: number;

    constructor(bounds: Bounds, scale = 100) {
        this.west = bounds.west;
        this.south = bounds.south;
        this.east = bounds.east;
        this.north = bounds.north;
        this.scale = scale;
    }

    get center() {
        const lonCenter = (this.east + this.west) / 2;
        const latCenter = (this.north + this.south) / 2;
        return [ lonCenter, latCenter ];
    }

    get mercatorScaleFactorY() {
        const getRadians = (deg: number) => deg * Math.PI / 180;
        const lat = this.center[1];
        return 1 / Math.cos(getRadians(lat));
    }

    get boundsRatio() {
        return Math.abs((this.east - this.west) / (this.south - this.north));
    }

    get size() {
        return {
            width: Math.abs(this.east - this.west) * this.scale,
            height: Math.abs(this.north - this.south) * this.scale * this.mercatorScaleFactorY
        }
    }

    getRadians(deg: number) {
        return deg * Math.PI / 180;
    }

    _getMercatorFactorY(lat: number) {
        return Math.log((1 + Math.sin(this.getRadians(lat))) / (1 - Math.sin(this.getRadians(lat))));
    }

    getMapPosition(longitude: number, latitude: number) { // used in Google Maps

        const mapWidth = this.size.width; // in pixels
        const mapHeight = this.size.height; // in pixels
        const mapLonDelta = Math.abs(this.east - this.west); // in degrees
        
        let relativeMapWidth = mapLonDelta * this.getRadians(1);
        let mercatorSouth = this._getMercatorFactorY(this.south);
        let mercatorLat = this._getMercatorFactorY(latitude);
        let mercatorDiff = mercatorLat - mercatorSouth;
        let relativeOffsetY = mercatorDiff / relativeMapWidth / 2;

        let y = mapHeight - mapWidth * relativeOffsetY;
        let x = (longitude - this.west) * (mapWidth / mapLonDelta);

        return [x, y];
    }
}

export interface RenderCities {
	id: string | number;
	name: string;
	inhabitants: number;
	x: number;
	y: number;
}

export class MapBuilder extends SvgMapBuilder {
    constructor(bounds: Bounds, scale = 100) {
        super(bounds, scale);
    }
    _sortByInhabitants(cities: City[]) {
        return cities.sort((a, b) => Math.sign(b.inhabitants - a.inhabitants))
    }
    getCities(cities: City[], baseFontSize: number) {
        const positionMap = new Map();
        const currentCities: RenderCities[] = [];
        const sortedCities = this._sortByInhabitants(cities)
        sortedCities.forEach((city) => {
            const [x, y] = this.getMapPosition(city.lon, city.lat);
            const elWidth = baseFontSize * 0.6 * city.name.length + 30;
            const row = Math.floor(y / (baseFontSize*2))
            const mapKey = row - (row % 2)
            const rowIsAvailable = !positionMap.has(mapKey)
            let isAvailable = false;
            
            if(rowIsAvailable) {
                positionMap.set(mapKey, [[Math.floor(x), Math.floor(x + elWidth)]])
                isAvailable = true;
            }
            else {
                const currentRow = positionMap.get(mapKey)
                const columnIsAvailable = currentRow.every(([start, end]: number[]) => x + elWidth < start || x > end)
                if(columnIsAvailable) {
                    positionMap.set(mapKey, [...currentRow, [Math.floor(x), Math.floor(x + elWidth)]])
                    isAvailable = true;
                }
            }
            if(isAvailable) {
                const currentCity = {
                    id: city.id,
                    name: city.name,
                    inhabitants: city.inhabitants,
                    x,
                    y
                }
                currentCities.push(currentCity)
            }
        })
        return currentCities
    }
}