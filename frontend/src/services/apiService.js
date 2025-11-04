// src/services/apiService.js 

const BASE_URL = 'app/endpoints';

const apiService = {
    async get(endpoint) {
        const response = await fetch(`${BASE_URL}${endpoint}`, { headers: getHeader() });
        return handleResponse(response);
    },
    
    async post(endpoint, body) {
        const response = await fetch(`${BASE_URL}$ {endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body:JSON.stringify(body)
        });
        return handleResponse(res);
    },
    
    async put(endpoint, body) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(body)
        });
        return handleResponse(response);
    },

    async patch(endpoint, body) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(body)
        });
        return handleResponse(response);
    },
    
    async delete(endpoint) {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse(res);
    }
};

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
});

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({})) ;
        throw new Error(error.message || `HTTP ${response.status}`);
    }
    return response.json();
};

export default apiService;

