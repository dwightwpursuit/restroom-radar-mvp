const STORAGE_KEY = 'nyc_restroom_radar_data';

// Save restrooms to browser storage
export const saveRestrooms = (restrooms) => {
  try {
    const data = JSON.stringify(restrooms);
    sessionStorage.setItem(STORAGE_KEY, data);
    return true;
  } catch (error) {
    console.error('Error saving restrooms:', error);
    return false;
  }
};

// Load restrooms from browser storage
export const loadRestrooms = () => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error loading restrooms:', error);
    return null;
  }
};

// Clear all restrooms from storage
export const clearRestrooms = () => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing restrooms:', error);
    return false;
  }
};

// Export restrooms as JSON for download
export const exportRestrooms = (restrooms) => {
  const dataStr = JSON.stringify(restrooms, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `restroom-radar-data-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
};