import axios from 'axios';

export const apiBaseUrl = process.env.NODE_ENV ? 'http://localhost:3001' : 'production';

export const getUser = id => axios(`${apiBaseUrl}/user/${id}`);
export const getTrips = id => axios(`${apiBaseUrl}/trips/${id}`);