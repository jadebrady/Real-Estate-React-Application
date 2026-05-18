import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { register } from '../services/auth.js';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        setValidated(true);
        register(email, password)
            .then(() => navigate('/login'))
            .catch(() => setError('Registration failed. Please try again.'));
    };
    return (
        <>
            <h1>Register Page</h1>
            <Form style={{ width: '50%', margin: '0 auto' }} noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
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
                {error && <p className="text-danger">{error}</p>}
                <Button type="submit">Register</Button>
                <p className="text-muted mt-3">Already have an account? <Link to='/login'>Login</Link></p>
            </Form>
        </>
    )
}

export default Register;