import axios from "axios";

const instance = () => {
  return axios.create({
    baseURL: "https://api.shyft.to/sol",
  });
};

export default instance;
