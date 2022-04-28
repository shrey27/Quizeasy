import './quiz.css';
import { useParams } from 'react-router-dom'
import { useQuizId } from '../../utility';
import { Question } from './Question';

const defaultState = {
    id: '',
    title: '',
    description: '',
    banner: '',
    questions: [],
    answers: [],
    options: []
}

export default function Quiz() {
    const { quizId } = useParams();
    const quizObject = useQuizId(`${quizId}`);
    
    return <div>
        <Question quizObject={quizObject ?? defaultState} />
    </div>
}