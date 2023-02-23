import axios from "axios";
// import https from "https";

const clientAxios = axios.create({
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false,
  // }),
  baseURL: "https://209.105.239.29/PruebaReactJs/Api/",
});

export default clientAxios;
