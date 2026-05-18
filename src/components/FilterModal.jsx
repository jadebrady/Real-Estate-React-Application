import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getRentalPropertyTypes } from '../services/rentals.js';
import { useEffect } from 'react';

function FilterModal({filters, onFilterChange}) {
    const [show, setShow] = useState(false);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getRentalPropertyTypes().then(setPropertyTypes);
    }, []);

    const handleCheckbox = (type) => {
        const updated = filters.propertyTypes.includes(type)
        ? filters.propertyTypes.filter(t => t !== type)
        : [...filters.propertyTypes, type];
        onFilterChange({ ...filters, propertyTypes: updated });
    };

    const handleField = (field, value) => {
        if ((field === 'minimumRating' || field === 'maximumRating') && (value < 0 || value > 5)) {
            setErrors(prev => ({ ...prev, [field]: 'Rating must be between 0 and 5' }));
            return;
        } 
        if (value < 0) {
            setErrors(prev => ({ ...prev, [field]: 'Value cannot be negative' }));
            return;
        }
        setErrors(prev => ({ ...prev, [field]: null }));
        onFilterChange({ ...filters, [field]: value });
    };

    const handleSave = () => {
        setShow(false);
    };

    const filterFields = [
        { label: "Min Rent", field: "minimumRent" },
        { label: "Max Rent", field: "maximumRent" },
        { label: "Min Bedrooms", field: "minimumBedrooms" },
        { label: "Max Bedrooms", field: "maximumBedrooms" },
        { label: "Min Bathrooms", field: "minimumBathrooms" },
        { label: "Max Bathrooms", field: "maximumBathrooms" },
        { label: "Min Parking Spaces", field: "minimumParking" },
        { label: "Max Parking Spaces", field: "maximumParking" },
        { label: "Min Rating", field: "minimumRating" },
        { label: "Max Rating", field: "maximumRating" },
    ];

    return (
        <>
            <Button className='w-50 mx-auto my-3' size="sm" variant="outline-secondary" onClick={() => setShow(true)}>
                Filters
            </Button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Filters</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="filters">
                            
                            <label htmlFor="propertyTypes">Property Types</label>
                            <div className='card mt-1' style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)"}}>
                            {propertyTypes.map((type) => (
                                <div key={type} className="m-1">
                                    <Form.Check
                                        type="checkbox"
                                        id={type}
                                        label={type}
                                        checked={filters.propertyTypes.includes(type)}
                                        onChange={() => handleCheckbox(type)}
                                    />
                                </div>
                            ))}
                            </div>
                            { filterFields.map(({ label, field }) => (
                                <Form.Group className="mb-3" controlId={field} key={field}>
                                    <Form.Label>{label}</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={filters[field] || ''}
                                        onChange={e => handleField(field, e.target.value)}
                                        isInvalid={!!errors[field]}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors[field]}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )) }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FilterModal;