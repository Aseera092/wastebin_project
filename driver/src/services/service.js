export const SERVICE_URL = 'http://localhost:3005/'


export const fileUploadAPI = async (data) => {
    const response = await fetch(`${SERVICE_URL}fileUpload`, {
        method: "POST",
        body: data
    })
    return response.json();
}

