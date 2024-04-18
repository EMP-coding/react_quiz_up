import React, { useState } from 'react';

interface FormData {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

function RegisterView () {
    const [formData, setFormData] = useState<FormData>({email: '', first_name: '', last_name: '', password: ''});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(previous => ({...previous, [name]: value}));
};


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch('https://cae-bookstore.herokuapp.com/user', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Failed to register user');
        alert('Registration Successful! 😁')
    } catch (error) {
        console.error('Registration Failure')
        alert('Registration Failed')
    }
};

return (
    <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div className="input-group">
                <label htmlFor="first_name">First Name</label>
                <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} />
            </div>
            <div className="input-group">
                <label htmlFor="last_name">Last Name</label>
                <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit" className="register-button">Submit</button>
        </form>
    </div>
);
};


export default RegisterView;