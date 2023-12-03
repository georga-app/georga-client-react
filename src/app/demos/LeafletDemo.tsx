/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import L, { LatLngExpression } from 'leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

import Map, { Marker, Popup } from '@/components/shared/LazyLeafletMap';

function LeafletDemo() {
  const position: LatLngExpression = [52.5166892, 13.4251842]
  return <></>
  // return (
  //   <Map
  //     center={position}
  //     zoom={17}
  //     scrollWheelZoom={false}
  //     style={{ height: '400px' }}
  //   >
  //     <Marker position={position}>
  //       <Popup>
  //         Open Knowledge Foundation Deutschland e.V.
  //       </Popup>
  //     </Marker>
  //   </Map>
  // )
}

export default LeafletDemo;
