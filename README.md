### React Component
# Render cities to custom map 

This component displays a custom svg map and renders a given list of cities to the map by their latitude and longitude props. As many cities as possible, sorted by size, are rendered to the map as long as their names don't overlap. If zoomed in, more cities are displayed on the map.

[Demo](http://render-cities-to-custom-map.mirja-t.de)

## How to use

#### Basic usage

A custom map prop is required. `mapComponent` needs to be passed as a function with a React component containing the custom map as return value.

```
import SvgMapCities from "render-cities-to-custom-map"
import CustomMap from "./CustomMap"

function App() {
  return (
    <SvgMapCities 
      mapdata={mapdata}
      mapComponent={() => <GermanyMap/>}/>
    )
}
```

#### data structure
```
import { MapData } from "render-cities-to-custom-map";

export const mapdata: MapData = {
    name: "germany",
    bounds: {
        north: 55.0582645 // latitude of the northernnmost point of the map 
        east: 15.04193, // longitude of the easternmost point of the map 
        south: 47.271679, // latitude of the southernmost point of the map 
        west: 5.866944, // longitude of the westernmost point of the map 
    },
    cities: [
        {
            id: "berlin",
            name: "Berlin",
            lat: 52.51777021534373,
            lon: 13.405460226934554,
            inhabitants: 3755251
        },
        {
            id: "hamburg",
            name: "Hamburg",
            lat: 53.550556,
            lon: 9.993333,
            inhabitants: 1830000
        },
        ...
    ]
}
```

#### optional:

+ zoom: number, defaults to 1
+ baseFontSize: number, font size of largest cities, defaults to 14 
+ color: string, color of city names and related dots, defaults to black

```
import SvgMapCities from "render-cities-to-custom-map"
import CustomMap from "./CustomMap"

const config = {
  baseFontSize: 18,
  color: '#CCC'
}

function App() {
  const [zoom, setZoom] = useState(1)
  return (<>
    <SvgMapCities 
      zoom={zoom}
      mapdata={mapdata}
      mapComponent={(zoom) => <CustomMap zoom={zoom}/>}
      {...config}/>
    <input style={{ position: 'fixed', bottom: 5, left: 5, zIndex: 3 }} type="number" value={zoom} onChange={(e) => { setZoom(Number(e.target.value)) }} />
  </>)
}
```