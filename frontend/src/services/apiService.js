//src/services/apiService.js 

/* Centralized API service (fetch wrapper): Provides unified error handling, headers, and timeout support */
const BASE_URL = import.meta.env.VITE_API_BASE || '/api';

/* CORE: request methods */
const apiService = {
    async get(endpoint, params = null) {
        const url = buildUrl(endpoint, params);
        return request(url, { method: 'GET'});
    },

    async post(endpoint, body){
        return request(endpoint, { method: 'POST', body });
    },

    async put(endpoint, body) {
        return request(endpoint, { method: 'PUT', body });
    }, 
    
    async patch(endpoint, body) {
        return request(endpoint, { method: 'PATCH', body });
    },
    async delete(endpoint) {
        return requestAnimationFrame(endpoint, { method: 'DELETE' });
    },
};

/* INTERNAL HELPERS: Main fetch wrapper with error and timeout handling */
async function request(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint: `${BASE_URL}${endpoint}`;
    const config = {
        method: options.method || 'GET',
        Headers: getHeaders(options.body),
        body: prepareBody(optionas.body),
    };

    try {
        const response = await fetchWithTimeout(url, config);
        return await handleResponse(response);
    } catch (error) {
        console.error(`[API ERROR] ${config.method} ${url}`, error);
        throw formatNetworkError(error);
    }
}

/* INTERNAL HELPERS: Generate headers, including token if available */
function getHeaders(body = null) {
    const headers = {};

    /* Only add JSON content type for non-FormData bodies */
    if (!(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    return headers;
}

/* INTERNAL HELPERS: Safety handle various body types (JSON / FormData) */
function prepareBody(body) {
    if (!body) return undefined;
    if (body instanceof FormData) return body;
    return JSON.stringify(body);
}

/* INTERNAL HELPERS: Read auth token from localStorage */
function getToken() {
    return localStorage.getItem('token');
}

/* Handle API responses consistently */
async function handleResponse(response) {
    const contentType = response.headers.get('Content-Type') || '';

    /* Try parsing JSON safety */
    const data = contentType.includes('application/json')
        ? await safeJson(response)
        : await response.text();

    if (!response.ok) {
        const message = data?.message || `HTTP Error ${response.status}`;
        throw { status: response.status, message, data };
    }

    /* Return parsed JSON or row text */
    return data || true;
}

/* Safe JSON parsing */
async function safeJson(response) {
    try {
        return await response.json();
    } catch {
        return {};
    }
}

/* Adds a timeout to fetch requests */
function fetchWithTimeout(resource, options, timeout = 15000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    return fetch(resource, {...options, signal: controller.signal }).finally(() => 
        clearTimeout(id)
    );
}

/* Helper: Build query parameters for GET requests */
function buildUrl(endpoint, params) {
    if (!params) return endpoint;
    const query = new URLSearchParams(params).toString();
    return `${endpoint}?${query}`;
}

/* Helper: Normalize network errors for controllser */
function formatNetworkError(error) {
    if (error.name === 'AbortError') {
        return new Error('Request timed out. Please try again. ');
    }
    if (error.message === 'Failed to fetch') {
        return new Error('Network error: Unable to reach the server.');
    }
    return error;
}

export default apiService;


