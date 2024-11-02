import { SERVICE_URL } from "./service";


export const addUserAPI = async (data) => {
    const response = await fetch(`${SERVICE_URL}users/`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data)
    })
    return response.json();
}

export const userLoginAPI = async (data) => {
    const response = await fetch(`${SERVICE_URL}userLogin/login`,{
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data)
    })
    return response.json();
}

export const AddRequestAPI = async (data) => {
    const response = await fetch(`${SERVICE_URL}users/request`,{
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data)
    })
    return response.json();
}

export const getRequestbyId = async (id) => {
    const response = await fetch(`${SERVICE_URL}users/request/${id}`,{
        method: "GET",
    })
    return response.json();
}

export const getRequest = async () => {
    const response = await fetch(`${SERVICE_URL}users/request`,{
        method: "GET",
    })
    return response.json();
}


export const updateRequestStatus = async (id,data) => {
    const response = await fetch(`${SERVICE_URL}users/request/${id}`,{
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(data)
    })
    return response.json();
}