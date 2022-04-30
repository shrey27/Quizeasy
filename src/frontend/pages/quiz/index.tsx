import './quiz.css';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom'
import { useQuizId, useAppDispatch, useAppSelector } from '../../utility';
import { Question } from './Question';
import { useNavigate } from 'react-router-dom';
import { HOMEPAGE, RESULT } from '../../routes';
import { Rules } from '../rules';
import { userActions } from '../../store/userSlice';
import { updateUserhandler } from '../../service/userActions';

const defaultState = {
    title: '',
    questions: [],
    answers: [],
    options: [],
    banner: '',
    description: ''
}
const TIME = 35;
export default function Quiz() {
    const { quizId } = useParams();
    const quizObject = useQuizId(`${quizId}`) ?? defaultState;
    const navigate = useNavigate();
    const [index, setIndex] = useState(-1);
    const [time, setTime] = useState(TIME);
    const [attempts, setAttempts] = useState(new Array(quizObject.questions.length).fill(undefined))
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(state => state.users.userInfo);

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
            const quizObj = {
                title: quizObject.title,
                questions: quizObject.questions,
                answers: quizObject.answers,
                options: quizObject.options,
                banner: quizObject.banner,
                description: quizObject.description,
                attempts,
                score,
                quizId
            }
            dispatch(userActions.getAttemptedQuiz(quizObj))
            const newInfo = {
                ...userInfo,
                score: userInfo.score + score,
                quiz: userInfo.quiz ? [...userInfo.quiz, { ...quizObj, quizId }] : [{ ...quizObj, quizId }]
            }
            dispatch(updateUserhandler(userInfo.uid, newInfo))
            navigate(RESULT);
        }
    }

    const handleOnReset = () => {
        const quizObj = {
            title: quizObject.title,
            questions: quizObject.questions,
            answers: quizObject.answers,
            options: quizObject.options,
            attempts: [],
            score: 0
        }
        const newInfo = {
            ...userInfo,
            quiz: [...userInfo.quiz, { ...quizObj, quizId }]
        }
        dispatch(updateUserhandler(userInfo.uid, newInfo))
        navigate(HOMEPAGE);
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
                    handleOnSubmit={handleOnSubmit}
                    handleOnReset={handleOnReset} />
            </div>}
    </>
}