// Type definitions for mapbuilder
import * as React from 'react';

interface Bounds {
    west: number,
    south: number,
    east: number,
    north: number
}

interface SvgSize {
    width: number;
    height: number;
}

interface GeoPosition {
    lat: number;
    lon: number;
}

interface City extends GeoPosition {
    name: string;
    id: string | number;
    inhabitants: number;
}

interface MapData {
    name?: string;
    bounds: Bounds;
    cities: City[];
}

interface SvgMapProps {
	zoom?: number;
	mapComponent: (zoom?: number) => React.ReactElement;
	mapdata: MapData;
	baseFontSize?: number;
	color?: string;
	scale?: number;
}

export {
    Bounds,
    SvgSize,
    GeoPosition,
    City,
    MapData,
    SvgMapProps
}