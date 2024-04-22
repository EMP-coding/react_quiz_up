import React, { useState, ChangeEvent } from 'react';
interface NewQuestion {
    question: string;
    answer: string;
}
const CreateQuestionView: React.FC = () => {
    const [newQuestion, setNewQuestion] = useState<NewQuestion>({ question: '', answer: '' });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewQuestion({ ...newQuestion, [name]: value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://cae-bookstore.herokuapp.com/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newQuestion),
            });
            if (!response.ok) {
                throw new Error('Failed to create question');
            }
            alert('Question created successfully');
            setNewQuestion({ question: '', answer: '' });
        } catch (error) {
            console.error('Failed to create question:', error);
        }
    };
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Create New Question</h2>
                <div className="input-group">
                    <label>Question:</label>
                    <input type="text" name="question" value={newQuestion.question} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label>Answer:</label>
                    <input type="text" name="answer" value={newQuestion.answer} onChange={handleChange} />
                </div>
                <button type="submit" className="button">Create</button>
            </form>
        </div>
    );
};
export default CreateQuestionView;
