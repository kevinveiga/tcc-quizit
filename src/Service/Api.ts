import axios from 'axios';

import { apiUrl } from '../Config';

export const api = axios.create({
    baseURL: apiUrl
});

api.defaults.headers.post['Content-Type'] = 'application/json';
