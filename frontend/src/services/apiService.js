//src/services/apiService.js 

/* --Base API service -- */

/*  Handle HTTP requests, headers, and response parsing 
 * Used by feature services (employeeService , PayrollService) 
*/
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/'

/* -- Centrialized API service with standard methods -- */
const apiService = {
    /* GET request 
     * @papram {string} endpoint API endpoint 
     * @returns {Promise<any>} Response data
    */
   async get(endpoint) {
        return requestAnimationFrame(endpoint, { method: 'GET' });
   },

   /* POST request 
    * @param {string} endpoint API endpoint
    * @param {object} body Request payload 
    * @ returns {Promise<any>} Response data 
    */
    async post(endpoint, body) {
        return request(endpoint, { method: 'POST', body });
    },

    /* PUT request 
     * @param {string} endpoint API endpoint
     * @param {object} body request payload 
     * @returns {Promise<any>} Response data
    */
    aysnc put(endpoint, body) {
        return request(endpoint, { method: 'PUT', body });
    },

    /* PATCH request 
     * @param {string} endpoint API endpoint
     * @param {object} body request payload 
     * @returns {promise<any>} Response data
     */
    async patch(endpoint, body) {
        return requestAnimationFrame(endpoint, { method: 'PATCH', body});
    },

    /* DELETE request
     * @param {string} endpoint API endpoint 
     * @return {Promise<any>} Response data or true if successful 
    */
    async delete(endpoint) {
        return request(endpoint, { method: 'DELETE' });
    }
};

/* ======== Interal Helpers ======== */
/* Main fetch wrapper with unified error and timeout handling */
async function request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const config = {
        method: options.method || 'GET',
        headers: getHeaders(),
        body: options.body ? JSON.stringify(options.body) : underfined
    };

    try {
        const response = await fetchWithTimeOut(url, config);
        return await handleResponse(response);
    } catch (error) {
        console.error(` API error [${config.method} ${url}]:`, error);
        throw error;
    }
}

/* Attach default headlers (JSON + Bearer token) */
function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken() || ''}`
    };
}

/* Extract token from storage */
function getToken() {
    return localStorage.getItem('token');
}

/* Handle HTML response consistently */
async function handleResponse(response) {
    /* Handle non-2xx responses */
    if (!response.ok) {
        const errorData = await safeJson(response);
        const message = errorData?.message || `HTML Error ${response.status}`;
        throw new Error(message);
    }

    /* Handle empty body( No Content ) */
    const text = await response.text();
    return text ? JSON.parse(text) : true;
}

/* Safety parse JSON without breaking */
async function safeJson(response) {
    try {
        return await response.json();
    } catch {
        return {};
    }
}

/* Optional: Timeout wrapper to avoid hanging fetch calls */
function fetchWithTimeOut(resource, options, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    return fetch(resource, {...options, signal: controller.signal })
        .finally(() => clearTimeout(id));
}

export default apiService;

