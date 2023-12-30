import axios from "axios";
import {APP_DOMAIN, GET_CATEGORY } from "../Constants/AppPaths";

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
    
   
}

export default CommonServices;