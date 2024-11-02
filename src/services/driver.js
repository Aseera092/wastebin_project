import { SERVICE_URL } from "./service";


export const addDriver = async (data) => {
    const response = await fetch(`${SERVICE_URL}driver`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data)
    })
    return response.json();
}

export const getDriver = async (data) => {
    const response = await fetch(`${SERVICE_URL}driver`)
    return response.json();
}

export const updateDriver = async (id, data) => {
    const response = await fetch(`${SERVICE_URL}driver/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(data)
    })
    return response.json();
}

export const deleteDriver = async (id) => {
    const response = await fetch(`${SERVICE_URL}driver/${id}`, {
        method: "DELETE"
    })
    return response.json();
}