import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route, Link } from "react-router-dom";
import RegisterView from './components/RegisterView';
import LoginView from './components/LoginView';
import ProfileView from './components/ProfileView';
import QuestionsView from './components/QuestionsView';
import { MyQuestionsView } from './components/MyQuestionsView';
import CreateQuestionView from './components/CreateQuestionView';
import ProtectedRoute from './components/ProtectedRoute'; 
import './index.css';

function App() {
    return (
        <Container className="maincontain mb-4">
            <div className="navbar">
                <h1>Quiz Up</h1>
                <div className="nav-links">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/questions">Questions</Link>
                    <Link to="/myquestions">My Questions</Link>
                    <Link to="/create-question">Create Question</Link>
                </div>
            </div>

            <Routes>
                <Route path="/register" element={<RegisterView />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfileView />
                    </ProtectedRoute>
                } />
                <Route path="/questions" element={<QuestionsView />} />
                <Route path="/myquestions" element={
                    <ProtectedRoute>
                        <MyQuestionsView />
                    </ProtectedRoute>
                } />
                <Route path="/create-question" element={
                    <ProtectedRoute>
                        <CreateQuestionView />
                    </ProtectedRoute>
                } />
            </Routes>
        </Container>
    );
}

export default App;
