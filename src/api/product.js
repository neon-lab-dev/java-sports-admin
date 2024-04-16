import axios from "axios"
import { API } from "."



export const getAllProducts = () => {

    return new Promise((resolve, reject) => {
        axios.get(API.getAdminProducts, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(
                    err?.response?.data?.message ||
                    "Something went wrong, please try again"
                )
            })
    })
}

export const createProduct = (productData) => {
    return new Promise((resolve, reject) => {
        axios.post(API.createProduct, productData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(
                    err?.response?.data?.message ||
                    "Something went wrong, please try again"
                )
            })
    })
}


export const deleteProduct = (productId) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API.deleteProduct}/${productId}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(
                    err?.response?.data?.message ||
                    "Something went wrong, please try again"
                )
            })
    })
}

export const getProductDetail = (productId) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API.getProductDetail}/${productId}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(
                    err?.response?.data?.message ||
                    "Something went wrong, please try again"
                )
            })

    })
}

export const updateProduct = ({ productId, productData }) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API.updateProduct}/${productId}`, productData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(
                    err?.response?.data?.message ||
                    "Something went wrong, please try again"
                )
            })
    })
}
