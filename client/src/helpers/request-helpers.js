import axios from 'axios';
import { apiBaseUrl } from '../constants/env';

export const requestConfig = {};

export const get = path => axios.get(`${apiBaseUrl}/${path}`);
export const post = (path, options) => {
  options = {
    ...options,
    ...(requestConfig.token && { token: requestConfig.token })
  };
  return axios.post(`${apiBaseUrl}/${path}`, options);
};
