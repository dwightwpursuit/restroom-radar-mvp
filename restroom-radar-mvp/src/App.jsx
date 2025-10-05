import { useState } from 'react';
import Map from './components/Map';
import SubmitForm from './components/SubmitForm';
import RestroomList from './components/RestroomList';
import './App.css';

function App() {
  // Sample data with timestamps
  const [restrooms, setRestrooms] = useState([
    {
      id: 1,
      name: "Bryant Park Restroom",
      latitude: 40.7536,
      longitude: -73.9832,
      cleanliness: 4,
      status: "Open",
      accessible: true,
      genderNeutral: false,
      timestamp: new Date('2025-10-01').toISOString()
    },
    {
      id: 2,
      name: "Madison Square Park Restroom",
      latitude: 40.7420,
      longitude: -73.9881,
      cleanliness: 3,
      status: "Open",
      accessible: false,
      genderNeutral: true,
      timestamp: new Date('2025-10-02').toISOString()
    }
  ]);

  // Function to add new restroom
  const addRestroom = (newRestroom) => {
    setRestrooms(prev => [...prev, newRestroom]);
  };

  return (
    <div className="App">
      <header>
        <h1>🚻 NYC Restroom Radar</h1>
        <p>Find clean, accessible restrooms near you</p>
      </header>
      
      <main>
        <div className="stats">
          <p>📍 <strong>{restrooms.length}</strong> restrooms reported by the community</p>
        </div>

        <Map restrooms={restrooms} />
        
        <RestroomList restrooms={restrooms} />
        
        <SubmitForm onSubmit={addRestroom} />
      </main>
    </div>
  );
}

export default App;