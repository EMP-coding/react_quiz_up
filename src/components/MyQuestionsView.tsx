import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
interface Question {
    id: number;
    question: string;
    answer: string;
}
export const MyQuestionsView: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    useEffect(() => {
        fetchMyQuestions();
    }, []);
    const fetchMyQuestions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://cae-bookstore.herokuapp.com/question', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch questions: ${response.status} ${response.statusText}`);
            }
            const questionsData = await response.json();
            if (!Array.isArray(questionsData.questions)) {  
                console.error('Expected an array of questions, but got:', questionsData);
                throw new Error('Data format error: Expected an array of questions');
            }
            setQuestions(questionsData.questions); 
        } catch (error) {
            console.error('Failed to fetch my questions:', error);
        }
    };
    const handleUpdate = (id: number) => {
        console.log(`Update question with ID ${id}`);
    };
    const handleDelete = (id: number) => {
        console.log(`Delete question with ID ${id}`);
    };
    return (
        <div className="questions">
    <h1>My Questions</h1>
    <ul style={{ listStyleType: "none", padding: 0 }}>
        {questions.map((question) => (
            <li key={question.id} className="questionCard">
                <h2>{question.question}</h2>
                <div className="answer">
                    <p>Answer: {question.answer}</p>
                </div>
                <div className="info">
                    <button className='button' onClick={() => handleUpdate(question.id)}>Update</button>
                    <button className='button' onClick={() => handleDelete(question.id)}>Delete</button>
                </div>
            </li>
        ))}
        <Link to="/create-question" className="button-container">
            <button>Create New Question</button>
        </Link>
    </ul>
</div>
    );
};
export default MyQuestionsView;
