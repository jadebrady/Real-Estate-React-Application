import { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getStates } from '../services/rentals.js';


function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [states, setStates] = useState([]);

    useEffect(() => {
        getStates().then(setStates);
    }, []);

    function handleSubmit() {
        const params = {};

        if (query) {
            if (/^\d+$/.test(query)) {
                params.postcode = query;
            } else if (states.some(s => s.toLowerCase() === query.trim().toLowerCase())) {
                params.state = query;
            } else {
                params.suburb = query.trim();
            }
        }
        onSearch(params);

    }

    return (
        <>
            <FloatingLabel controlId="searchInput" label="Search by Suburb, State or Postcode" className="mb-3 w-50 mx-auto">
                <Form.Control
                    type="search"
                    placeholder=""
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                />
            </FloatingLabel>
            <Button className='w-50 mx-auto' size="sm" variant="primary" onClick={handleSubmit}>Search</Button>
        </>

        
    );
}

export default SearchBar;