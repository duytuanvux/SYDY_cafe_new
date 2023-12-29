import axios from "axios";
import { APP_DOMAIN, GET_PURCHASED_ORDER, GET_USER_INFO, LOGIN, REGISTER, SUBMIT_FEEDBACK, UPDATE_USER_INFO } from "../Constants/AppPaths";

export class UserServices {
    async getUserInfo(user_id) {
        try {
            const url = `${APP_DOMAIN}${GET_USER_INFO}/${user_id}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
    async updateUserInfo(user_id,data) {
        try {
            const url = `${APP_DOMAIN}${UPDATE_USER_INFO}/${user_id}`;
            const response = await axios.post(url,data);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
    async getPurchasedOrder(data) {
        try {
            const url = `${APP_DOMAIN}${GET_PURCHASED_ORDER}/${data}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
    async submitFeedback(data) {
        try {
            const url = `${APP_DOMAIN}${SUBMIT_FEEDBACK}`;
            const response = await axios.post(url,data);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    async login(data) {
        try {
            const url = `${APP_DOMAIN}${LOGIN}`;
            const response = await axios.post(url,data);
            return response.data;
        } catch (error) {
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
    async register(data) {
        try {
            const url = `${APP_DOMAIN}${REGISTER}`;
            const response = await axios.post(url,data);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
}   


    

export default UserServices;