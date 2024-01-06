import apiService from "./AxiosService";

const makeRequest = async (method, url, data = {}, config = {}) => {
  try {
    const response = await method(url, data, {
      ...config,
      headers: { ...apiService.defaults.headers, ...config.headers },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const get = (url, config = {}) =>
   makeRequest(apiService.get, url, null, config);
export const post = (url, data, config = {}) =>
  makeRequest(apiService.post, url, data, config);
export const put = (url, data, config = {}) =>
  makeRequest(apiService.put, url, data, config);
export const patch = (url, data, config = {}) =>
  makeRequest(apiService.patch, url, data, config);
export const del = (url, config = {}) =>
  makeRequest(apiService.delete, url, null, config);
