import * as React from 'react';
import { MapBuilder, RenderCities } from '../utils/svgmapbuilder';
import { Cities } from './Cities';
import { SvgMapProps } from '../types';

export function SvgMap({
	zoom = 1,
	mapComponent,
	mapdata={
		name: '',
		bounds: { 
			west: 0, 
			east: 0, 
			north: 0, 
			south: 0 },
		cities: []
	},
	baseFontSize = 14,
	color = "black"
}: SvgMapProps) {

	zoom = Math.max(0.1, zoom);
	const map = React.useMemo(() => new MapBuilder(mapdata.bounds, 100), []);
	const { width, height } = map.size;
	const [cities, setCities] = React.useState<RenderCities[]>(map.getCities(mapdata.cities, baseFontSize));

	React.useEffect(() => {
		setCities(map.getCities(mapdata.cities, baseFontSize / zoom));
	}, [zoom]);
	
	return (
		<div 
			style={{
				width: `${100 * zoom}%`,
				position: 'relative',
				backgroundColor: '#efefef',
			}}>
			<svg 
				id="map" 
				x="0px" 
				y="0px" 
				viewBox={`0 0 ${width} ${height}`}
				xmlSpace="preserve"
				style={{ position: 'relative', zIndex: 2 }}>
				<Cities 
					cities={cities}
					zoom={zoom} 
					baseFontSize={(width / window.innerWidth) * baseFontSize} 
					color={color}/>
			</svg>
			<div style={{
				position: 'absolute',
				top: 0,
				left: 0,
				zIndex: 1,
				width: '100%',
				height: '100%',
			}}>{ mapComponent(zoom) }</div>
		</div>)
}