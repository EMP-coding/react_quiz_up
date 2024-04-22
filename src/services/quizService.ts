export interface Question {
    id: number;
    question: string;
    answer: string;
    author?: string;
    created_on?: string;
}

interface QuestionData {
    question?: string;
    answer?: string;
}

const API_BASE_URL = 'https://cae-bookstore.herokuapp.com';

const getToken = () => localStorage.getItem('token');

export async function fetchQuestions(): Promise<Question[]> {
    const response = await fetch(`${API_BASE_URL}/question/all`, {
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch questions');
    }
    return response.json();
}

export async function fetchMyQuestions(): Promise<Question[]> {
    const response = await fetch(`${API_BASE_URL}/question`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch my questions');
    }
    return response.json();
}

export async function createQuestion(questionData: QuestionData): Promise<Question> {
    const response = await fetch(`${API_BASE_URL}/question`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(questionData)
    });
    if (!response.ok) {
        throw new Error('Failed to create question');
    }
    return response.json();
}

export async function updateQuestion(questionId: number, questionData: QuestionData): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/question/${questionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(questionData)
    });
    if (!response.ok) {
        throw new Error('Failed to update question');
    }
}

export async function deleteQuestion(questionId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/question/${questionId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to delete question');
    }
}
