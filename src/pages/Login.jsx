import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { login } from '../services/auth.js';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';


function Login() {
    const { setLoggedIn } = useAuth();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        setValidated(true);
        login(email, password)
            .then(() => {
                setLoggedIn(true);
                navigate('/');
            })
            .catch(() => setError('Login failed. Please try again.'));

    }
    return (
        <>
            <h1>Login Page</h1>
            <Form style={{ width: '50%', margin: '0 auto' }} noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email address.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <Form.Control.Feedback type="invalid">
                        A password is required.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Login</Button>
                <p className="text-muted mt-3">Don't have an account? <Link to='/register'>Register</Link></p>
            </Form>
        </>
    )
}

export default Login;