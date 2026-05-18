const BASE_URL = "http://4.237.58.241:3000";

export function api(endpoint, options = {}) {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      return response.json();
    });
}

export function authApi(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  if (token) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
  }
  return api(endpoint, options);
}