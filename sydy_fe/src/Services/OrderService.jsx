import axios from "axios";
import { APP_DOMAIN, CREATE_ORDER } from "../Constants/AppPaths";

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
}

export default OrderServices;