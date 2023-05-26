import axios from "axios";
import { authHeader } from "./auth.header";

const URL = process.env.REACT_APP_ADMIN_URL;

const deleteDriver = async (driverID) => {
  try {
    return axios
      .delete(`${URL}/v1/drivers/${driverID}`, {
        headers: authHeader(),
      })
      .then((resp) => {
        console.log("Deleted", resp.data);
      });
  } catch (error) {
    console.log(error);
  }
};

export { deleteDriver };
