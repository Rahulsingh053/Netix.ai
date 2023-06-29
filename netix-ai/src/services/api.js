const BASE_URL = '/api';

const api = {
  fetchData: async () => {
    try {
      const response = await fetch(`${BASE_URL}/data`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  saveData: async (updatedData) => {
    try {
      const response = await fetch(`${BASE_URL}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },
};

export default api;