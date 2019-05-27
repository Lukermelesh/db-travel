export const apiBaseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://travel-devbridge.azurewebsites.net/api'
    : 'http://localhost:3001';
