const STORAGE_KEY = 'myAppData';

export const saveDataToLocalStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to local storage:', error);
  }
};

export const loadDataFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading data from local storage:', error);
    return null;
  }
};
