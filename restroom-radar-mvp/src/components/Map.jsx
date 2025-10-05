import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = new Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function Map({ restrooms }) {
  // Default center: NYC (Times Square area)
  const nycCenter = [40.7580, -73.9855];

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer 
        center={nycCenter} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {restrooms.map((restroom) => (
          <Marker 
            key={restroom.id} 
            position={[restroom.latitude, restroom.longitude]}
            icon={DefaultIcon}
          >
            <Popup>
              <strong>{restroom.name}</strong><br />
              Cleanliness: {restroom.cleanliness}/5<br />
              Status: {restroom.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;