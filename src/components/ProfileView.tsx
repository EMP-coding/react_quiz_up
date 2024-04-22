import React, { useState, useEffect, ChangeEvent } from 'react';
interface User {
    email: string;
    first_name: string;
    last_name: string;
}
const ProfileView: React.FC = () => {
    const [user, setUser] = useState<User>({ email: '', first_name: '', last_name: '' });
    const [editedUser, setEditedUser] = useState<User>({ email: '', first_name: '', last_name: '' });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    useEffect(() => {
        const userDetailsString = localStorage.getItem('userDetails');
        console.log("Retrieved user details from localStorage:", userDetailsString);
        if (userDetailsString) {
            const userDetails: User = JSON.parse(userDetailsString);
            console.log("Parsed user details:", userDetails);
            setUser(userDetails);
            setEditedUser(userDetails);
        }
    }, []);
    const handleEdit = () => {
        setEditedUser({ ...user });
        setIsEditing(true);
    };
    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://cae-bookstore.herokuapp.com/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(editedUser),
            });
            if (!response.ok) {
                throw new Error('Failed to edit user profile');
            }
            localStorage.setItem('userDetails', JSON.stringify(editedUser));
            setUser(editedUser);
            setIsEditing(false);
            console.log("User profile updated and saved to localStorage");
        } catch (error) {
            console.error('Failed to save edited profile:', error);
        }
    };
    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://cae-bookstore.herokuapp.com/user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete user profile');
            }
            localStorage.removeItem('userDetails');
            setUser({ email: '', first_name: '', last_name: '' });
            alert('User profile deleted successfully.');
            console.log("User profile deleted and localStorage cleared");
        } catch (error) {
            console.error('Failed to delete profile:', error);
        }
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({ ...prevState, [name]: value }));
    };
    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {isEditing ? (
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={editedUser.email} onChange={handleChange} />
                    <label>First Name:</label>
                    <input type="text" name="first_name" value={editedUser.first_name} onChange={handleChange} />
                    <label>Last Name:</label>
                    <input type="text" name="last_name" value={editedUser.last_name} onChange={handleChange} />
                    <button className="button" onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <p>Email: {user.email}</p>
                    <p>First Name: {user.first_name}</p>
                    <p>Last Name: {user.last_name}</p>
                    <button className='button' onClick={handleEdit}>Edit</button>
                    <button className='button' onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};
export default ProfileView;
