import axios from "axios";
import { ADD_ITEM, APP_DOMAIN, DELETE_ITEM, EDIT_ITEM, GET_ALL_ITEM, GET_TOP_ITEMS } from "../Constants/AppPaths";

export class ItemServices {
    async getAllItem() {
        try {
            const url = `${APP_DOMAIN}${GET_ALL_ITEM}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
    async getTopItems() {
        try {
            const url = `${APP_DOMAIN}${GET_TOP_ITEMS}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    async deleteItem(item_id) {
        try {
            const url = `${APP_DOMAIN}${DELETE_ITEM}/${item_id}`;
            const response = await axios.delete(url);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
    async editItem(item_id, data) {
        try {
            const url = `${APP_DOMAIN}${EDIT_ITEM}/${item_id}`;
            const response = await axios.put(url,data);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
    async addItem( data) {
        try {
            const url = `${APP_DOMAIN}${ADD_ITEM}`;
            const response = await axios.post(url,data);
            return response.data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching items:", error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
}

export default ItemServices;