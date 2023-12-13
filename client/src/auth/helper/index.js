import axios from 'axios'
import { API } from '../../backend'

export const signUp = (user) => {
    return axios.post(`${API}/signup`, user, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response;
    }).catch(err => {
        // console.log(err)
        return err.response
    })
}

export const signIn = (user) => {
    return axios.post(`${API}/signin`, user, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response;
    }).catch(err => {
        console.log(err)
        return err.response
    })
}

export const authenticate = (data, next) => {
    if (typeof (window) !== "undefined") {
        console.log(data);
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const signout = (next) => {
    if (typeof (window) !== "undefined") {
        localStorage.removeItem("jwt")

        axios.get(`${API}/signout`)
            .then(response => console.log("Signout successful"))
            .catch(err => console.log(err))
    }
    next()
}

export const isAuthenticated = () => {
    if (typeof (window) == "undefined") {
        return false
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}