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

export const getProduct = async (productId) => {
    try {
        const response = await axios.get(`${API}/product/${productId}`)
        return response
    } catch (error) {
        return error.response
    }
}

export const getProductsByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${API}/products/${categoryId}`)
        return response
    } catch (error) {
        return error.response
    }
}

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API}/categories`)
        return response
    } catch (error) {
        return error.response
    }
}