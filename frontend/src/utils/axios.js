import axios from "axios";
import { auth } from "./firebase";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true, // Sends cookies automatically
});

// The gateway's `protect` middleware requires a Bearer token on every
// protected route, so attach the current Firebase ID token to each request.
api.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser;

  if (currentUser) {
    const token = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
