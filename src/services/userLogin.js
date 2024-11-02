import { SERVICE_URL } from "./service";

// User login function
export const userLogin = async (data) => {
    try {
        const response = await fetch(`${SERVICE_URL}userLogin`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(data),
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Return the parsed response as JSON
        return await response.json();
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

