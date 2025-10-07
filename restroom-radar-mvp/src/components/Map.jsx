import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = new Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Component to handle map updates
function MapUpdater({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 15, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  
  return null;
}

function Map({ restrooms, searchLocation }) {
  const nycCenter = [40.7580, -73.9855];

  const getCleanlinessEmoji = (rating) => {
    if (rating >= 4) return '✨';
    if (rating >= 3) return '👍';
    return '⚠️';
  };

  const getDirectionsUrl = (lat, lng) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
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
        
        <MapUpdater center={searchLocation} zoom={15} />
        
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
                
                {restroom.address && (
                  <div style={{ marginBottom: '8px', fontSize: '13px', color: '#6b7280' }}>
                    📍 {restroom.address}
                  </div>
                )}

                {restroom.accessCode && (
                  <div style={{ 
                    marginBottom: '8px', 
                    padding: '8px',
                    background: '#fef3c7',
                    borderRadius: '4px',
                    border: '1px solid #fbbf24'
                  }}>
                    <strong>🔑 Access Code:</strong> <code style={{ 
                      background: '#fef3c7',
                      padding: '2px 6px',
                      fontWeight: 'bold',
                      color: '#92400e'
                    }}>{restroom.accessCode}</code>
                  </div>
                )}
                
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
                
                <div style={{ marginTop: '12px' }}>
                  <a 
                    href={getDirectionsUrl(restroom.latitude, restroom.longitude)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      background: '#2563eb',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    Get Directions
                  </a>
                </div>
                
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