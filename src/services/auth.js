import { authApi } from './api'

export const login = (email, password) => authApi('/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email, password}), 
}).then(data => { localStorage.setItem("token", data.token); return data; });

export const register = (email, password) => authApi('/user/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email, password})
})

export const logout = () => localStorage.removeItem("token");

