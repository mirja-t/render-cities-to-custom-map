import { RenderCities } from "../utils/svgmapbuilder"

export const Cities = ({cities, zoom, fontSize, fontFamily, color}: {cities: RenderCities[], zoom: number, fontSize: number, fontFamily: string, color: string}) => {
    return (
        <g id="cities">
                {cities.map(({id, x, y, name, inhabitants}) => (
					<g key={id}> 
						{inhabitants >= 500000 ? 
							<rect 
                                fill={color}
								x={x-(fontSize * 0.2)} 
								y={y-(fontSize * 0.2)} 
								width={fontSize * 0.4} 
								height={fontSize * 0.4} /> : 
						inhabitants >= 100000 ? <circle fill={color} cx={x} cy={y} r={3 / zoom} /> : 
						<circle fill="transparent" stroke={color} strokeWidth={1 / zoom} cx={x} cy={y} r={2 / zoom} />}
						<text 
							style={{
                                fill: color,
								fontFamily: fontFamily,
								fontSize: (inhabitants >= 500000) ? fontSize : 
								fontSize * 0.8,
								fontWeight: (inhabitants >= 500000) ? 'bold' : 'normal'
							}} 
							x={x + fontSize * 0.5}
							y={y + (fontSize * 0.25)}
							>
								{name}
						</text>
					</g>
				))}
            </g>
    )
}