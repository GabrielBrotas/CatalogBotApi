import { APP_API_URL } from './../../config/constants';
import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
})
