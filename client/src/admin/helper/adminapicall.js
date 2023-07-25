import axios from "axios";
import { API } from "../../backend";

export const createCategory = async (userId, token, category) => {
    try {
        const response = await axios.post(`${API}/category/${userId}`, category, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        );
        return response;
    } catch (err) {
        return err.response;
    }
}

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API}/categories`);
        return response;
    } catch (err) {
        return err.response;
    }
}

// Product calls

// create a product

export const createProduct = async (userId, token, product) => {
    try {
        const response = await axios.post(`${API}/product/create/${userId}`, product, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (err) {
        return err.response;
    }
}

// get products

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API}/products`);
        return response;
    } catch (err) {
        return err.response;
    }
}

// get a product

export const getProduct = async (productId) => {
    try {
        const response = await axios.get(`${API}/product/${productId}`);
        return response;
    } catch (err) {
        return err.response;
    }
}

// delete a product

export const deleteProduct = async (productId, userId, token) => {
    try {
        const response = await axios.delete(`${API}/product/${productId}/${userId}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (err) {
        return err.response;
    }
}

// update a product

export const updateProduct = async (productId, userId, token, product) => {
    try {
        const response = await axios.put(`${API}/product/${productId}/${userId}`, product, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (err) {
        return err.response;
    }
}