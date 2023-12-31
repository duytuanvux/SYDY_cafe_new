import axios from "axios";
import { APP_DOMAIN, CREATE_ORDER, GET_ALL_ORDERS } from "../Constants/AppPaths";

export class OrderServices {
    async createOrder(data) {
        try {
            const url = `${APP_DOMAIN}${CREATE_ORDER}`;
            const response = await axios.post(url,data);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
    async getAllOrder(data) {
        try {
            const url = `${APP_DOMAIN}${GET_ALL_ORDERS}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
}

export default OrderServices;