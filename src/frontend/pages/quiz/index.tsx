import './quiz.css';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom'
import { useQuizId } from '../../utility';
import { Question } from './Question';
import { useNavigate } from 'react-router-dom';
import { RESULT } from '../../routes';
import { Rules } from '../rules';
import { useAppDispatch } from '../../utility';
import { userActions } from '../../store/userSlice';
const defaultState = {
    title: '',
    questions: [],
    answers: [],
    options: []
}
// const quizObject = {
//     title: 'Lorem Ipsum',
//     questions: ['Lorem ipsum 1', 'Lorem ipsum 2', 'Lorem ipsum 3', 'Lorem ipsum 4', 'Lorem ipsum 5'],
//     answers: ['one', 'two', 'three', 'one', 'two'],
//     options: [{ one: 'one', two: 'two', three: 'three' }, { one: 'one', two: 'two', three: 'three' }, { one: 'one', two: 'two', three: 'three' }, { one: 'one', two: 'two', three: 'three' }, { one: 'one', two: 'two', three: 'three' }]
// }
const TIME = 35;

export default function Quiz() {
    const { quizId } = useParams();
    const quizObject = useQuizId(`${quizId}`) ?? defaultState;
    const navigate = useNavigate();
    const [index, setIndex] = useState(-1);
    const [time, setTime] = useState(TIME);
    const [attempts, setAttempts] = useState(new Array(quizObject.questions.length).fill(undefined))
    const dispatch = useAppDispatch();

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

    const calculateScore = () => {
        return quizObject.answers.reduce((acc, curr, index) => curr === attempts[index] ? acc + 20 : acc, 0)
    }

    const handleOnSubmit = () => {
        if (index < quizObject.questions.length - 1) {
            setTime(TIME);
            setIndex(i => i + 1);
        }
        else {
            const score = calculateScore();
            dispatch(userActions.getAttemptedQuiz({
                title: quizObject.title,
                questions: quizObject.questions,
                answers: quizObject.answers,
                options: quizObject.options,
                attempts,
                score
            }))
            navigate(RESULT);
        }
    }

    return <>
        {index < 0 ? <Rules handleOnSubmit={handleOnSubmit} /> :
            <div className="quiz__body">
                <h1 className="title xl sb cen sm-s">{quizObject.title}</h1>
                <div className="flex-ct-sb subheading">
                    <span className="score md">Questions : {index + 1}/{quizObject.questions.length}</span>
                    <span className="score md fl-rt">
                        Time Left : 00:{time < 10 ? `0${time}` : time}
                    </span>
                </div>
                <Question
                    question={quizObject.questions[index]}
                    options={quizObject.options[index]}
                    attempts={attempts}
                    setAttempts={setAttempts}
                    index={index}
                    handleOnSubmit={handleOnSubmit} />
            </div>}
    </>
}