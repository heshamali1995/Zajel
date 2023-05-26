import axios from "axios";
import { authHeader } from "./auth.header";

const URL = process.env.REACT_APP_ADMIN_URL;

const updateDriver = async (status, notes, driverID) => {
  const data = {
    status: status,
    notes: notes,
  };
  const headers = authHeader();
  try {
    return axios.put(`${URL}/v1/drivers/${driverID}/admin`, data, { headers });
  } catch (error) {
    console.log(error);
  }
};

export { updateDriver };
