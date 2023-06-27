import axios from "axios";

import { API_URL } from "./constants";

export const userApi = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Empty response data");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
