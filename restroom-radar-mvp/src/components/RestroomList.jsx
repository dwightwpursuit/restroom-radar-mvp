function RestroomList({ restrooms }) {
    const getStatusColor = (status) => {
      switch(status) {
        case 'Open': return '#10b981';
        case 'Closed': return '#ef4444';
        case 'Restricted': return '#f59e0b';
        default: return '#6b7280';
      }
    };
  
    const getCleanlinessEmoji = (rating) => {
      if (rating >= 4) return '✨';
      if (rating >= 3) return '👍';
      return '⚠️';
    };
  
    return (
      <div className="restroom-list">
        <h2>All Restrooms ({restrooms.length})</h2>
        
        {restrooms.length === 0 ? (
          <p className="empty-message">No restrooms added yet. Be the first to contribute!</p>
        ) : (
          <div className="list-grid">
            {restrooms.map((restroom) => (
              <div key={restroom.id} className="restroom-card">
                <div className="card-header">
                  <h3>{restroom.name}</h3>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(restroom.status) }}
                  >
                    {restroom.status}
                  </span>
                </div>
                
                <div className="card-body">
                  <div className="info-row">
                    <span className="label">Cleanliness:</span>
                    <span className="value">
                      {getCleanlinessEmoji(restroom.cleanliness)} {restroom.cleanliness}/5
                    </span>
                  </div>
                  
                  <div className="info-row">
                    <span className="label">Location:</span>
                    <span className="value coordinates">
                      {restroom.latitude.toFixed(4)}, {restroom.longitude.toFixed(4)}
                    </span>
                  </div>
                  
                  {(restroom.accessible || restroom.genderNeutral) && (
                    <div className="features">
                      {restroom.accessible && (
                        <span className="feature-badge">♿ Accessible</span>
                      )}
                      {restroom.genderNeutral && (
                        <span className="feature-badge">🚻 Gender Neutral</span>
                      )}
                    </div>
                  )}
                  
                  {restroom.timestamp && (
                    <div className="timestamp">
                      Added: {new Date(restroom.timestamp).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  export default RestroomList;