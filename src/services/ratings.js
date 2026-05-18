import { authApi } from './api'

export const getRatings = () => authApi('/ratings');
export const submitRating = (rentalId, rating) => authApi(`/ratings/rentals/${rentalId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rentalId, rating })
});
export const getRatingByRentalId = (rentalId) => authApi(`/ratings/rentals/${rentalId}`);