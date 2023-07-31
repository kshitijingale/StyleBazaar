import axios from "axios";
const { API } = require("../../backend");


export const getToken = async (userId, token) => {
    try {
        const response = await axios.get(`${API}/payment/gettoken/${userId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}

export const processPayment = async (userId, token, paymentInfo) => {
    try {
        const response = await axios.post(`${API}/payment/braintree/${userId}`, paymentInfo, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}