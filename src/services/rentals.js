import { api } from './api'

export const getStates = () => api('/rentals/states') // For a dropdown menu (search)
export const getRentalPropertyTypes = () => api('/rentals/property-types') // For a dropdown menu (search)
export const getRentalById = (id) => api(`/rentals/${id}`) // For the property page
export const searchRentals = (params) => { // For the search page
    const query = new URLSearchParams(params).toString()
    return api(`/rentals/search?${query}`)
}
export const getRentals = (params) => { // For the list page
    return api(`/rentals/search?${params}`)
}
