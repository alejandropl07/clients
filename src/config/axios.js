import axios from "axios";
import https from "https";

const clientAxios = axios.create({
  httpsAgent: new https.Agent({
    requestCert: true,
    rejectUnauthorized: false,
  }),
  baseURL: process.env.REACT_APP_API_URL,
});

export default clientAxios;
