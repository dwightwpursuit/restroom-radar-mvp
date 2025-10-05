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

  const getCleanlinessEmoji = (rating) => {
    if (rating >= 4) return '✨';
    if (rating >= 3) return '👍';
    return '⚠️';
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer 
        center={nycCenter} 
        zoom={13} 
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
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
              <div style={{ minWidth: '200px' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '16px' }}>
                  {restroom.name}
                </h3>
                
                <div style={{ marginBottom: '8px' }}>
                  <strong>Cleanliness:</strong> {getCleanlinessEmoji(restroom.cleanliness)} {restroom.cleanliness}/5
                </div>
                
                <div style={{ marginBottom: '8px' }}>
                  <strong>Status:</strong> <span style={{ 
                    color: restroom.status === 'Open' ? '#10b981' : 
                           restroom.status === 'Closed' ? '#ef4444' : '#f59e0b',
                    fontWeight: 'bold'
                  }}>
                    {restroom.status}
                  </span>
                </div>
                
                {(restroom.accessible || restroom.genderNeutral) && (
                  <div style={{ 
                    marginTop: '10px', 
                    paddingTop: '10px', 
                    borderTop: '1px solid #e5e7eb' 
                  }}>
                    {restroom.accessible && <div>♿ Wheelchair Accessible</div>}
                    {restroom.genderNeutral && <div>🚻 Gender Neutral</div>}
                  </div>
                )}
                
                {restroom.timestamp && (
                  <div style={{ 
                    marginTop: '10px', 
                    fontSize: '12px', 
                    color: '#6b7280' 
                  }}>
                    Added: {new Date(restroom.timestamp).toLocaleDateString()}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;