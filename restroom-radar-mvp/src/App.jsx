import { useState, useEffect } from 'react';
import Map from './components/Map';
import SubmitForm from './components/SubmitForm';
import RestroomList from './components/RestroomList';
import SearchBar from './components/SearchBar';
import { initialRestrooms } from './data/initialRestrooms';
import { saveRestrooms, loadRestrooms, clearRestrooms, exportRestrooms } from './utils/restroomStorage';
import './App.css';

function App() {
  // Load restrooms from storage or use initial data
  const [restrooms, setRestrooms] = useState(() => {
    const saved = loadRestrooms();
    return saved || initialRestrooms;
  });

  const [searchLocation, setSearchLocation] = useState(null);

  // Save to storage whenever restrooms change
  useEffect(() => {
    saveRestrooms(restrooms);
  }, [restrooms]);

  // Function to add new restroom
  const addRestroom = (newRestroom) => {
    setRestrooms(prev => [...prev, newRestroom]);
  };

  // Function to handle location search
  const handleLocationSearch = (location) => {
    setSearchLocation([location.latitude, location.longitude]);
  };

  // Function to reset to initial data
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      clearRestrooms();
      setRestrooms(initialRestrooms);
    }
  };

  // Function to export data
  const handleExport = () => {
    exportRestrooms(restrooms);
  };

  return (
    <div className="App">
      <header>
        <h1>🚻 NYC Restroom Radar</h1>
        <p>Find clean, accessible restrooms near you</p>
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
        <p>Data persists during your session. Export your data to save permanently!</p>
      </footer>
    </div>
  );
}

export default App;