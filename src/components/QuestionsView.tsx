import { useEffect, useState } from 'react';

type Question = {
    id: number;
    question: string;
    answer: string;
    author: string;
    created_on: string;
};

function QuestionsView() {
    const [questions, setQuestions] = useState<Question[]>([]);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('https://cae-bookstore.herokuapp.com/question/all');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("API Data:", data);

            if (!data.questions || !Array.isArray(data.questions)) {
                console.error('Expected data.questions to be an array', data);
                throw new Error('Data is not structured as expected');
            }

            setQuestions(data.questions);
        } catch (error) {
            console.error('Failed to fetch questions:', error);
            setQuestions([]);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className='questions'>
            <h1>All Questions</h1>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {questions.map((question) => (
                    <li key={question.id} className="questionCard">
                        <h2>{question.question}</h2>
                        <div className="answer">
                            <p>Answer: {question.answer}</p>
                        </div>
                        <div className="info">
                            <p>Author: {question.author}</p>
                            <p>Created On: {question.created_on}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default QuestionsView;
