import { useState, useEffect } from 'react';
import { getRentalById } from '../services/rentals';
import { useParams, useNavigate } from 'react-router-dom';
import { car, bath, bed, star } from '../components/Icons.jsx';
import Accordion from 'react-bootstrap/Accordion';
import Map from '../components/Map.jsx';
import CarouselHouse from '../components/CarouselHouse.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import Button from 'react-bootstrap/Button';
import { getRatingByRentalId, getRatings, submitRating } from '../services/ratings.js';
import StarRating from '../components/StarRating.jsx';

function PropertyPage() {
    const { loggedIn } = useAuth();
    const [rental, setRental] = useState(null);
    const [currentlyRating, setCurrentlyRating] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [myRating, setMyRating] = useState(null);

    useEffect(() => {
        if (loggedIn) {
            getRatings().then(data => {
                const existing = data.data.find(r => r.rentalId === Number(id));
                setMyRating(existing ?? null);
            });
        }
    }, [id, loggedIn]);

    useEffect(() => {
        getRentalById(id).then(setRental)
        .catch(() => navigate('/'));
    }, [id]);

    const handleSubmitRating = (rating) => {
        submitRating(id, rating)
            .then(() => {
                setCurrentlyRating(false);
                getRatings().then(data => {
                    setMyRating(data.data.find(r => r.rentalId === Number(id)) ?? null);
                });
                getRentalById(id).then(setRental); 
            })
            .catch(err => {
                console.error(err);
                alert('Failed to submit rating. Please try again later.');
            });
    };

    return (
        <>
            {rental && (
                <div>
                    <h2 style={{ padding: "25px 0" }}>{rental.title}</h2>
                    <h4 style={{ textTransform: "capitalize" }}>{rental.propertyType}</h4>

                    <span style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                        <p>{rental.streetAddress}</p>
                        <p>{rental.suburb}</p>
                        <p>{rental.postcode}</p>
                        <p>{rental.state}</p>
                    </span>

                    <h3>${rental.rent}</h3>

                    <CarouselHouse />

                    <span style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                        <p>{bath} {rental.bathrooms}</p>
                        <p>{bed} {rental.bedrooms}</p>
                        <p>{car} {rental.parkingSpaces}</p>
                    </span>
                    <span style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                        <p>{rental.averageRating ?? "-"} {star}</p>
                        <p>({rental.numRatings})</p>
                        {loggedIn ? (
                            <Button
                                size="sm"
                                className='mb-3'
                                onClick={() => setCurrentlyRating(true)}
                                variant="dark"
                            >
                                Add a Rating
                            </Button>
                        ) : (
                            <Button
                                variant="dark"
                                className='mb-3'
                                size="sm"
                                onClick={() => navigate("/login")}
                            >
                                Login to add a rating
                            </Button>
                        )}
                    </span>
                    {loggedIn && myRating && (
                        <p>Your rating: {'★'.repeat(myRating.rating)}{'☆'.repeat(5 - myRating.rating)}</p>
                    )}
                    <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                    {currentlyRating && <StarRating onSubmit={handleSubmitRating} />}
                    </div>
                    <Accordion defaultActiveKey="0" variant='dark'>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Description & Amenities</Accordion.Header>
                            <Accordion.Body>
                                <p style={{ padding: "5px 100px" }} dangerouslySetInnerHTML={{ __html: rental.description }}></p>
                                <p>{rental.amenities}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Location</Accordion.Header>
                            <Accordion.Body>
                                <Map lat={rental.latitude} long={rental.longitude} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <p>{rental.agencyName}</p>
                </div>
            )}
        </>
    )
}

export default PropertyPage;