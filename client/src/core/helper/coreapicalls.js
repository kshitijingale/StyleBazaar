import axios from "axios";
import { API } from "../../backend";

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API}/products`)
        return response
    } catch (error) {
        return error.response
    }
}