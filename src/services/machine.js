import { SERVICE_URL } from "./service";


export const addMachine = async (data) => {
    const response = await fetch(`${SERVICE_URL}machine`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data)
    })
    return response.json();
}

export const getMachine = async (data) => {
    const response = await fetch(`${SERVICE_URL}machine`)
    return response.json();
}

export const updateMachine = async (id, data) => {
    const response = await fetch(`${SERVICE_URL}machine/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(data)
    })
    return response.json();
}

export const deleteMachine = async (id) => {
    const response = await fetch(`${SERVICE_URL}machine/${id}`, {
        method: "DELETE"
    })
    return response.json();
}