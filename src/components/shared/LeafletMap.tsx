import { LatLngExpression } from 'leaflet';
import { Suspense, lazy } from 'react'
import type { MapOptions } from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'

import { SxProps } from '@mui/material';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

const Map: React.FC<
  {
    center: [number, number],
    children: React.ReactNode,
    zoom: number,
    style: React.CSSProperties,
  } & MapOptions
> = ({ children, style={}, ...options }) => {
  return (
    <Suspense fallback={<div style={style} />}>
      <MapContainer
        maxZoom={18}
        style={style}
        {...options}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </Suspense>
  )
}

export default Map;
