import axios from "axios"
import { API } from "../../backend"

export const createOrder = async (userId, orderData, token) => {
    try {
        const response = await axios.post(`${API}/order/create/${userId}`, orderData, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        return re
    } catch (error) {
        return error.response
    }
}

export const emptyCart = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem('cart')
        next()
    }
}