import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

const axiosInstance = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_API_PORT}`,
});

export const useAppAxios = makeUseAxios({ axios: axiosInstance });
