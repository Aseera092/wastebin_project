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


//whatsap connect

export const getQrCode = async () => {
    const response = await fetch(`${SERVICE_URL}qr-code`,{
        method: "GET",
    })
    return response.json();
}

export const getWhatsappStatus = async () => {
    const response = await fetch(`${SERVICE_URL}whatsapp-status`,{
        method: "GET",
    })
    return response.json();
}

export const getSettings = async () => {
    const response = await fetch(`${SERVICE_URL}get-settings`,{
        method: "GET",
    })
    return response.json();
}

export const updateSettings = async (data) => {
    const response = await fetch(`${SERVICE_URL}update-settings`,{
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(data)
    })
    return response.json();
}