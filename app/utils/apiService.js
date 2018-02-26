import axios from 'axios';

import Config from '../config';
import { getToken } from '../utils/helpers/utility';

let isRefreshing = false;
const refreshSubscribers = [];

const instance = axios.create({
  baseURL: Config.apiUrl,
});

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
  refreshSubscribers.map((cb) => cb(token));
};

const refreshAccessToken = () => {
  const credential = getToken();

  if (credential.get('refreshToken')) {
    return axios.post(`${Config.apiUrl}/api/auth/login`, {
      refreshToken: credential.get('refreshToken'),
    })
      .then(async ({ data }) => {
        await localStorage.setItem('access_token', data.token);
        return data.token;
      });
  }
  return Promise.reject();
};

// bearer token
instance.interceptors.request.use((request) => {
  const credential = getToken();
  request.headers['Content-Type'] = 'application/json';
  if (credential.get('accessToken')) {
    request.headers['x-access-token'] = credential.get('accessToken');
  }
  return request;
}, (error) => error);

// refresh token
instance.interceptors.response.use((response) => response, (error) => {
  const { config, response: { status } } = error;
  const originalRequest = config;

  if (status === 401 && error.response.data.message.indexOf('expired') > -1) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshAccessToken()
        .then((newToken) => {
          isRefreshing = false;
          onRefreshed(newToken);
        });
    }

    const retryOrigReq = new Promise((resolve, reject) => {
      subscribeTokenRefresh((token) => {
        // replace the expired token and retry
        originalRequest.headers['x-access-token'] = token;
        resolve(axios(originalRequest));
      });
    });
    return retryOrigReq;
  }
  return Promise.reject(error);
});

export default class ApiService {
  static get(...options) {
    return instance.get(...options);
  }

  static put(...options) {
    return instance.put(...options);
  }

  static post(...options) {
    return instance.post(...options);
  }

  static delete(...options) {
    return instance.delete(...options);
  }

  static patch(...options) {
    return instance.patch(...options);
  }
}
