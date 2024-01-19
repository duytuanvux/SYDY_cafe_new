import axios from "axios";
import { APP_DOMAIN, CANCEL_ORDER, CREATE_ORDER, GET_ALL_ORDERS, ORDER_NEED_ACTION, UPDATE_SHIPPER_ORDER, UPDATE_STATUS_ORDER } from "../Constants/AppPaths";

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
    async updateStatusOrder(order_id, data) {
        try {
            const url = `${APP_DOMAIN}${UPDATE_STATUS_ORDER}/${order_id}`;
            const response = await axios.put(url,data);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
    async updateShipperOrder(order_id, data) {
        try {
            const url = `${APP_DOMAIN}${UPDATE_SHIPPER_ORDER}/${order_id}`;
            const response = await axios.put(url,data);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
    async orderNeedAction() {
        try {
            const url = `${APP_DOMAIN}${ORDER_NEED_ACTION}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
    async cancelOrder(order_id) {
        try {
            const url = `${APP_DOMAIN}${CANCEL_ORDER}/${order_id}`;
            const response = await axios.put(url);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
}

export default OrderServices;