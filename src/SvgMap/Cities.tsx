import * as React from 'react';
import { RenderCities } from "../utils/svgmapbuilder"

export const Cities = ({cities, zoom, baseFontSize, color='#999'}: {cities: RenderCities[], zoom: number, baseFontSize: number, color?: string}) => {
    return (
        <g id="cities">
                {cities.map(({id, x, y, name, inhabitants}) => (
					<g key={id}> 
						{inhabitants >= 500000 ? 
							<rect 
                                fill={color}
								x={x-(4 / zoom)} 
								y={y-(4 / zoom)} 
								width={8 / zoom} 
								height={8 / zoom} /> : 
						inhabitants >= 100000 ? <circle fill={color} cx={x} cy={y} r={3 / zoom} /> : 
						<circle fill="transparent" stroke={color} cx={x} cy={y} r={2 / zoom} />}
						<text 
							style={{
                                fill: color,
								fontFamily: 'Arial, sans-serif',
								fontSize: (inhabitants >= 500000) ? baseFontSize / zoom : 
								(baseFontSize * 0.8) / zoom,
								fontWeight: (inhabitants >= 500000) ? 'bold' : 'normal'
							}} 
							x={x + (inhabitants >= 500000 ? 12 : 8) / zoom}
							y={y + (4 / zoom)}
							>
								{name}
						</text>
					</g>
				))}
            </g>
    )
}