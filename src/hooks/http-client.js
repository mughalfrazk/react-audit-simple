import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setGlobalError, setGlobalLoading } from "../redux/slices/local-slice";
import { useAuth } from "../hooks/auth";

const useHttpClient = () => {
  const dispatch = useDispatch();
  const { session } = useAuth();
  const baseURL = process.env.REACT_APP_BASE_URL;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const headers = () => {
    let requestHeaders = {};
    requestHeaders['Access-Control-Allow-Origin'] = '*';
    if (!!session) requestHeaders['Authorization'] = `Bearer ${session.access_token}`
    return requestHeaders;
  }

  const client = axios.create({
    baseURL,
    timeout: 30000,
    headers: headers()
  })

  client.interceptors.request.use(
    req => {
      setIsLoading(true);
      dispatch(setGlobalLoading(true))
      console.log(req.url + ' called...');
      return req;
    },
    err => {
      setIsLoading(false)
      setError(err?.response?.data?.message)
      dispatch(setGlobalLoading(false))
      dispatch(setGlobalError(err?.response?.data?.message))
      return Promise.reject(err);
    },
  )

  client.interceptors.response.use(
    req => {
      setIsLoading(false);
      dispatch(setGlobalLoading(false))
      return req;
    },
    err => {
      setIsLoading(false)
      setError(err?.response?.data?.message)
      dispatch(setGlobalLoading(false))
      dispatch(setGlobalError(err?.response?.data?.message))
      return Promise.reject(err);
    },
  )

  const request = {
    get: async path => {
      return await client.get(path);
    },
    
    post: async (path, params, config) => {
      return await client.post(path, params, config);
    },

    patch: async (path, params, config) => {
      return await client.patch(path, params, config);
    },

    put: async (path, params, config) => {
      return await client.put(path, params, config);
    },

    delete: async (path, config) => {
      return await client.delete(path, config);
    },
  }

  return {isLoading, setIsLoading, error, setError, request};
}

export default useHttpClient;