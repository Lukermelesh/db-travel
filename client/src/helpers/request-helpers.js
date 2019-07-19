import axios from 'axios';
import { apiBaseUrl } from '../constants/env';

export const requestConfig = {};

const getHeader = () => ({
  headers: { Authorization: `Bearer ${requestConfig.token}` }
});
export const get = path => axios.get(`${apiBaseUrl}${path}`, getHeader());
export const post = (path, body) => axios.post(`${apiBaseUrl}${path}`, body, getHeader());
export const put = (path, body) => axios.put(`${apiBaseUrl}${path}`, body, getHeader());
