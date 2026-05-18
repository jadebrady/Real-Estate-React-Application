import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import house from '../assets/house.png';
import { useNavigate } from 'react-router-dom';

function FeaturedCard({ img, title, rent, link }) {
    const navigate = useNavigate();

    return (
        <Card style={{ width: '20rem', transition: 'transform 0.2s', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    ${rent}.00 per week
                </Card.Text>
                <Button onClick={() => navigate(link)} variant="outline-primary">View Details</Button>
            </Card.Body>
        </Card>
    );
}

export default FeaturedCard;