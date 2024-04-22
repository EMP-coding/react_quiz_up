import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('https://cae-bookstore.herokuapp.com/login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Received data:", data);
                if (data.token && data.first_name && data.last_name && data.user_id && (data.email || data.email === "")) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userDetails', JSON.stringify({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        user_id: data.user_id
                    }));
                    navigate('/myquestions'); 
                } else {
                    throw new Error('Incomplete data received from server');
                }
            } else {
                throw new Error('Failed to login with status code: ' + response.status);
            }
        } catch (error: any) {
            console.error('Login Failure:', error);
            setError('Login Failed: ' + (error.message || 'Unknown error'));
        }
    };
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                </div>
                <button className='button' type="submit">Login</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};
export default LoginView;
