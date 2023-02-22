import axios from "axios";

const clientAxios = axios.create({
  baseURL: "https://209.105.239.29/PruebaReactJs/Api/",
});

export default clientAxios;
