import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Rating from '@mui/material/Rating';

export default function StarRating({ onSubmit }) {
    const [rate, setRating] = useState(0);

    return (
        <div>
            <div>
                <Rating
                name="rating"
                value={rate}
                onChange={(event, newValue) => {
                setRating(newValue);
                }}
                />
            </div>
            <Button size="sm" variant='success' className='mb-3' onClick={() => onSubmit(rate)}>
                Submit
            </Button>
        </div>
    );
}