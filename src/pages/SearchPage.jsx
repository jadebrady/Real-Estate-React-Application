import { searchRentals } from '../services/rentals.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import house from '../assets/house.png';
import FeaturedCard from '../components/FeaturedCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import FilterModal from '../components/FilterModal.jsx';

function SearchPage() {
    const navigate = useNavigate();
    const [featuredRentals, setFeaturedRentals] = useState([]);
    const [filters, setFilters] = useState({
        propertyTypes: [],
        minimumBathrooms: null, maximumBathrooms: null,
        minimumParking: null, maximumParking: null,
        minimumBedrooms: null, maximumBedrooms: null,
        minimumRating: null, maximumRating: null,
        minimumRent: null, maximumRent: null,
    });

    useEffect(() => {
        searchRentals(new URLSearchParams({ page: 1 }))
            .then(data => setFeaturedRentals(data.data.slice(0, 3)));
    }, []);

    const handleSearch = (params) => {
        const searchParams = new URLSearchParams();
        const { propertyTypes, ...rest } = { ...params, ...filters };
        Object.entries(rest).forEach(([key, value]) => {
            if (value !== null && value !== '' && value !== undefined) {
                searchParams.append(key, value);
            }
        });
        propertyTypes.forEach(type => searchParams.append('propertyTypes', type));
        navigate(`/list?${searchParams.toString()}`);
    };

    return (
        <>
            <h1>Search Rentals</h1>
            <SearchBar onSearch={handleSearch} />
            <FilterModal filters={filters} onFilterChange={setFilters}/>
            <hr />
            <h3 style={{ padding: "25px 0" }}>Some properties we think you might like</h3>
            <span style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                {featuredRentals.map((rental) => (
                    <FeaturedCard
                        key={rental.id}
                        img={house}
                        title={rental.title}
                        rent={rental.rent}
                        link={`/property/${rental.id}`}
                    />
                ))}
            </span>
        </>
    );
}

export default SearchPage;