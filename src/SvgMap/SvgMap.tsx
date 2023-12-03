import { MapBuilder, RenderCities } from '../utils/svgmapbuilder';
import { Cities } from './Cities';
import { SvgMapProps } from '../types';
import { useEffect, useMemo, useState } from 'react';

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
	fontFamily = "Arial, sans-serif",
	baseFontSize = 14,
	color = "black"
}: SvgMapProps) {
	
	zoom = Math.max(0.1, zoom);
	const map = useMemo(() => new MapBuilder(mapdata.bounds, 100), []);
	const { width, height } = map.size;
	const fontSize = (width / window.innerWidth) * (baseFontSize / zoom)
	const [cities, setCities] = useState<RenderCities[]>(map.getCities(mapdata.cities, fontSize));
	
	useEffect(() => {
		setCities(map.getCities(mapdata.cities, fontSize));
	}, [zoom]);
	
	const offset = fontSize * 5;

	return (
		<div 
			style={{
				width: `${(width + offset * 2) * zoom}px`,
				height: `${height * zoom}px`,
				paddingLeft: `${100 - (100 / (100 + (offset * 100 / width))) * 100}%`
			}}>
			<div style={{
				position: 'relative',
			}}>
				<svg 
					id="map" 
					x="0px" 
					y="0px" 
					viewBox={`0 0 ${width + offset} ${height}`}
					xmlSpace="preserve"
					style={{ position: 'relative', zIndex: 2 }}>
					<Cities 
						cities={cities}
						zoom={zoom} 
						fontSize={fontSize} 
						fontFamily={fontFamily}
						color={color}/>
				</svg>
				<div style={{
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: 1,
					width: '100%',
					height: '100%',
					paddingRight: `${100 - (100 / (100 + (offset * 100 / width))) * 100}%`
				}}>{ mapComponent(zoom) }</div>
			</div>
		</div>)
}