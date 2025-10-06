import { useState } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

function SearchBar({ onLocationFound }) {
  const [address, setAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const provider = new OpenStreetMapProvider();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!address.trim()) return;

    setIsSearching(true);
    try {
      const results = await provider.search({ query: address });
      if (results && results.length > 0) {
        const result = results[0];
        onLocationFound({
          latitude: result.y,
          longitude: result.x,
          label: result.label
        });
        alert(`Found: ${result.label}`);
      } else {
        alert('Address not found. Try a different search.');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching for address.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Search for address (e.g., Times Square, New York)"
          disabled={isSearching}
        />
        <button type="submit" disabled={isSearching || !address.trim()}>
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;