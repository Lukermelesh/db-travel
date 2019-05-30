const productionUrl = 'https://travel-devbridge.azurewebsites.net/api';
const localUrl = 'http://localhost:3001';

export const apiBaseUrl =
  process.env.NODE_ENV === 'production'
    ? productionUrl
    : process.env.REACT_APP_SERVER === 'production'
    ? productionUrl
    : productionUrl;
