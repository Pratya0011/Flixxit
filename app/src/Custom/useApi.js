import React from "react";
import apiService from "./AxiosService";

function useApi() {
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

  const get = (url, config = {}) =>
    makeRequest(apiService.get, url, null, config);
  const post = (url, data, config = {}) =>
    makeRequest(apiService.post, url, data, config);
  const put = (url, data, config = {}) =>
    makeRequest(apiService.put, url, data, config);
  const patch = (url, data, config = {}) =>
    makeRequest(apiService.patch, url, data, config);
  const del = (url, config = {}) =>
    makeRequest(apiService.delete, url, null, config);

    return {get, post, put, patch, del};
}

export default useApi;
