import L from 'leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


const icon = L.icon({
    iconRetinaUrl:iconRetina,
    iconUrl: iconMarker,
    shadowUrl: iconShadow,
});

function LeafletDemo() {
  const position = [52.51682, 13.42511]
  return (
    <MapContainer
      center={position}
      zoom={17}
      scrollWheelZoom={false}
      style={{height : '400px'}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={icon}>
        <Popup>
          Open Knowledge Foundation Deutschland e.V.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default LeafletDemo;
