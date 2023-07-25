import axios from "axios";
import { API } from "../../backend";

export const createCategory = (userId, token, category) => {
    return axios.post(`${API}/category/${userId}`, category, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    ).then(response => {
        return response
    }).catch(err => {
        return err.response
    })
}