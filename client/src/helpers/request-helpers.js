import axios from 'axios';
import { apiBaseUrl } from '../constants/env';

export const requestConfig = {};

const getHeader = () => ({
  headers: { Authorization: `BEARER ${requestConfig.token}` }
});
export const get = path => axios.get(`${apiBaseUrl}${path}`, getHeader());
export const post = (path, options) => {
  options = {
    ...options,
    ...(requestConfig.token && { token: requestConfig.token })
  };
  return axios.post(`${apiBaseUrl}${path}`, options, getHeader());
};
