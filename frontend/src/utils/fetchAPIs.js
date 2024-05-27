import axios from "axios";
import { toast } from "react-toastify";
let apiUrl = "http://localhost:8080/api/v1/";

export const apiCallFun = (method, slug, payload, token) => {
  let config = {
    method: method,
    maxBodyLength: Infinity,
    url: `${apiUrl + slug}`,
    headers: {
      token: `${token}`,
    },
    // Conditionally set the Content-Type based on the payload
    ...(payload instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" }),
    data: payload,
  };

  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error("Something went wrong! Please contact to the administrator");
      console.log(error);
    });
};
