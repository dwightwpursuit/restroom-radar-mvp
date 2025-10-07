import { useState, useEffect } from 'react';
import Map from './components/Map';
import SubmitForm from './components/SubmitForm';
import RestroomList from './components/RestroomList';
import SearchBar from './components/SearchBar';
import { initialRestrooms } from './data/initialRestrooms';
import { saveRestrooms, loadRestrooms, clearRestrooms, exportRestrooms } from './utils/restroomStorage';
import './App.css';

function App() {
  const [restrooms, setRestrooms] = useState(() => {
    const saved = loadRestrooms();
    return saved || initialRestrooms;
  });

  const [searchLocation, setSearchLocation] = useState(null);

  useEffect(() => {
    saveRestrooms(restrooms);
  }, [restrooms]);

  const addRestroom = (newRestroom) => {
    setRestrooms(prev => [...prev, newRestroom]);
  };

  const handleLocationSearch = (location) => {
    setSearchLocation([location.latitude, location.longitude]);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      clearRestrooms();
      setRestrooms(initialRestrooms);
    }
  };

  const handleExport = () => {
    exportRestrooms(restrooms);
  };

  return (
    <div className="App">
      <header>
        <div className="header-content">
          <div className="logo-section">
            <img 
              src="/flushfinder-logo.png" 
              alt="FlushFinder NYC - Your Next Stop: Relief" 
              className="logo-image"
            />
          </div>
        </div>
      </header>
      
      <main>
        <div className="stats">
          <div className="stats-content">
            <p>📍 <strong>{restrooms.length}</strong> restrooms reported by the community</p>
            <div className="action-buttons">
              <button onClick={handleExport} className="action-btn export-btn">
                💾 Export Data
              </button>
              <button onClick={handleReset} className="action-btn reset-btn">
                🔄 Reset Data
              </button>
            </div>
          </div>
        </div>

        <SearchBar onLocationFound={handleLocationSearch} />

        <Map restrooms={restrooms} searchLocation={searchLocation} />
        
        <RestroomList restrooms={restrooms} />
        
        <SubmitForm onSubmit={addRestroom} />
      </main>

      <footer>
        <p>© 2025 FlushFinder NYC • Data persists during your session • Export to save permanently</p>
      </footer>
    </div>
  );
}

export default App;