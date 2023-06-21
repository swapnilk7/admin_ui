import axios from "axios";

import { API_URL } from "./constants";

export const userApi = async () => {
  try {
    let users = [];
    const response = await axios.get(API_URL);
    users = response.data;
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
