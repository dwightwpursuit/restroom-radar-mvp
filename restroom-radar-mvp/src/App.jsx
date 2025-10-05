import { useState } from 'react';
import Map from './components/Map';
import './App.css';

function App() {
  // Sample data - we'll replace this with real submissions later
  const [restrooms, setRestrooms] = useState([
    {
      id: 1,
      name: "Bryant Park Restroom",
      latitude: 40.7536,
      longitude: -73.9832,
      cleanliness: 4,
      status: "Open"
    },
    {
      id: 2,
      name: "Madison Square Park Restroom",
      latitude: 40.7420,
      longitude: -73.9881,
      cleanliness: 3,
      status: "Open"
    }
  ]);

  return (
    <div className="App">
      <header>
        <h1>🚻 NYC Restroom Radar</h1>
        <p>Find clean, accessible restrooms near you</p>
      </header>
      
      <main>
        <Map restrooms={restrooms} />
      </main>
    </div>
  );
}

export default App;