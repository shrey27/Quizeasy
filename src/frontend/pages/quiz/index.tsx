import './quiz.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useQuizId } from '../../utility';
import { Question } from './Question';

const defaultState = {
    title: '',
    questions: [],
    answers: [],
    options: []
}
const TIME = 5;

export default function Quiz() {
    const { quizId } = useParams();
    const quizObject = useQuizId(`${quizId}`) ?? defaultState;
    const [index, setIndex] = useState(0);
    const [time, setTime] = useState(TIME);

    useEffect(() => {
        let id = setTimeout(() => {
            if (index === 4 && time > 0) {
                clearTimeout(id);
            } else if (time === 1) {
                setTime(TIME);
                setIndex((c) => c + 1);
            } else {
                setTime((e) => e - 1);
            }
        }, 1000);
        return () => clearTimeout(id);
    }, [time, index]);

    return <div>
        <main className="quiz__body"><h1 className="title xl sb cen sm-s">{quizObject.title}</h1>
            <div className="flex-ct-sb subheading">
                <span className="score md">Questions: {index + 1}/{quizObject.questions.length}</span>
                <span className="score md">
                    Time Left: 00:{time < 10 ? `0${time}` : time}
                </span>
            </div>
            <Question question={quizObject.questions[index]} options={quizObject.options[index]} />
        </main>
    </div>
}