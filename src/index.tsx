import * as React from 'react'
import { SvgMap } from './SvgMap/SvgMap'
import {
  Bounds,
  SvgSize,
  GeoPosition,
  City,
  MapData,
  SvgMapProps
} from './types'

const SvgMapCities: React.FC<SvgMapProps> = (props: SvgMapProps) => (
  <SvgMap {...props} />
)

export {
  Bounds,
  SvgSize,
  GeoPosition,
  City,
  MapData,
  SvgMapProps
}
export default SvgMapCities