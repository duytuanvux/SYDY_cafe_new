import axios from "axios";
import {ADD_SHIPPER, APP_DOMAIN,GET_CATEGORY, GET_PAYMENT_METHOD, GET_SHIPPER, GET_STATUS, HIDE_SHIPPER, PRINT_ORDER, UPDATE_SHIPPER } from "../Constants/AppPaths";

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

  async addShipper(data) {
    try {
      const url = `${APP_DOMAIN}${ADD_SHIPPER}`;
      const response = await axios.post(url,data);
      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error fetching items:", error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }
  async updateShipper(shipper_id,data) {
    try {
      const url = `${APP_DOMAIN}${UPDATE_SHIPPER}/${shipper_id}`;
      const response = await axios.put(url,data);
      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error fetching items:", error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }

  async hideShipper(shipper_id) {
    try {
      const url = `${APP_DOMAIN}${HIDE_SHIPPER}/${shipper_id}`;
      const response = await axios.delete(url);
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
async getPaymentMethod() {
  try {
      const url = `${APP_DOMAIN}${GET_PAYMENT_METHOD}`;
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
