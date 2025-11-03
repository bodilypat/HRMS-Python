// Frontend/src/services/apiService.js

const BASE_URL = "http:/hrms/app"; //backend URL

export async function apiGet(path) {
    const response = await fetch(`${BASE_URL}${path}`);
    return response.json();
}

export async function apiPost(path, data) {
    const response = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function apiPut(path, data) {
    const response = await fetch(`${BASE_URL}${path}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function apiDelete(path) {
    await fetch(`${BASE_URL}${path}`, { method: "Delete" });
}
