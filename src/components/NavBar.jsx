import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../context/AuthContext.jsx';
import { logout } from '../services/auth.js';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const { loggedIn, setLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setLoggedIn(false);
        navigate('/');
    };

    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand onClick={() => navigate("/")} style={{cursor: "pointer"}}>Fortune Rentals</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate("/list")}>All Rentals</Nav.Link>
                        
                    </Nav>
                    { loggedIn ? (
                        <>
                        <Col xs="auto" className="mx-4">
                            <Nav.Link onClick={() => navigate("/ratings")}>Your Ratings</Nav.Link>
                        </Col>
                        <Col xs="auto">
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Col>
                        </>
                    ) : (
                        <>
                        <Col xs="auto">
                            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
                        </Col>
                        <Col xs="auto" className="mx-4">
                            <Nav.Link onClick={() => navigate("/register")}>Register</Nav.Link>
                        </Col>
                        </>
                    )}
                    
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;