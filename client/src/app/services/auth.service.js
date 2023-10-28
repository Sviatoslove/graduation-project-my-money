import axios from "axios";
import localStorageService from "./localStorage.service";
import configFile from "../config.json";

const { isFireBase, apiEndpointMongoDb } = configFile;

export const httpAuth = axios.create({
  baseURL: isFireBase
    ? "https://identitytoolkit.googleapis.com/v1/"
    : apiEndpointMongoDb + "/auth/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const urls = {
  registerUrl: isFireBase ? "accounts:signUp" : "signUp",
  logInUrl: isFireBase ? "accounts:signInWithPassword" : "signInWithPassword",
};

const authService = {
  register: async (payload) => {
    if (isFireBase) payload.returnSecureToken = true;
    const { data } = await httpAuth.post(urls.registerUrl, payload);
    return data;
  },
  logIn: async ({ email, password }) => {
    const { data } = await httpAuth.post(urls.logInUrl, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authService;
