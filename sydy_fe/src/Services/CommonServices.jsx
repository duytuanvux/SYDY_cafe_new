import axios from "axios";
import {APP_DOMAIN,GET_CATEGORY, GET_SHIPPER, GET_STATUS, PRINT_ORDER } from "../Constants/AppPaths";

export class CommonServices {
  async getCategory() {
    try {
      const url = `${APP_DOMAIN}${GET_CATEGORY}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error fetching items:", error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }
  async getShipper() {
    try {
      const url = `${APP_DOMAIN}${GET_SHIPPER}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error fetching items:", error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }
  async getStatus() {
    try {
      const url = `${APP_DOMAIN}${GET_STATUS}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error fetching items:", error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }
  async printOrder(order_id) {
    try {
        const url = `${APP_DOMAIN}${PRINT_ORDER}/${order_id}?print=true`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        // Handle errors
        console.error("Error fetching items:", error);
        throw error; // Rethrow the error to propagate it to the caller
    }
}
}

export default CommonServices;
