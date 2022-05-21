import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

export const useAppAxios = makeUseAxios({ axios: axiosInstance });
