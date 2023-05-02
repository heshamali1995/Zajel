import axios from "axios";

const URL = process.env.REACT_APP_ADMIN_URL;

const getAccessToken = async (email, password) => {
  return axios
    .post(`${URL}/v1/auth/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        sessionStorage.setItem("admin", JSON.stringify(response.data));
      }
      return response.data;
    });
};

export { getAccessToken };
