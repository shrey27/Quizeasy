import './quiz.css';
import { useState, useEffect, Fragment } from 'react';
// import { useParams } from 'react-router-dom'
// import { useQuizId } from '../../utility';
import { Question } from './Question';
import { useNavigate } from 'react-router-dom';
import { HOMEPAGE } from '../../routes';
import { Rules } from '../rules';

// const defaultState = {
//     title: '',
//     questions: [],
//     answers: [],
//     options: []
// }
const sampleQuizObject = {
    title: 'Lorem Ipsum',
    questions: ['Lorem ipsum 1', 'Lorem ipsum 2', 'Lorem ipsum 3', 'Lorem ipsum 4', 'Lorem ipsum 5'],
    answers: ['one', 'two', 'three', 'one', 'two'],
    options: [{ one: 'one', two: 'two', three: 'three' }, { one: 'one', two: 'two', three: 'three' }, { one: 'one', two: 'two', three: 'three' }, { one: 'one', two: 'two', three: 'three' }, { one: 'one', two: 'two', three: 'three' }]
}
const TIME = 35;

export default function Quiz() {
    // const { quizId } = useParams();
    // const quizObject = useQuizId(`${quizId}`) ?? defaultState;
    const navigate = useNavigate();
    const [index, setIndex] = useState(-1);
    const [time, setTime] = useState(TIME);
    const [attempts, setAttempts] = useState(new Array(sampleQuizObject.questions.length).fill(undefined))

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

    const handleOnSubmit = () => {
        if (index < sampleQuizObject.questions.length - 1) {
            setTime(TIME);
            setIndex(i => i + 1);
        }
        else {

            navigate(HOMEPAGE, { state: { attempts } });
        }
    }

    return <>
        {index < 0 ? <Rules handleOnSubmit={handleOnSubmit} /> :
            <div className="quiz__body">
                <h1 className="title xl sb cen sm-s">{sampleQuizObject.title}</h1>
                <div className="flex-ct-sb subheading">
                    <span className="score md">Questions : {index + 1}/{sampleQuizObject.questions.length}</span>
                    <span className="score md">
                        Time Left : 00:{time < 10 ? `0${time}` : time}
                    </span>
                </div>
                <Question
                    question={sampleQuizObject.questions[index]}
                    options={sampleQuizObject.options[index]}
                    attempts={attempts}
                    setAttempts={setAttempts}
                    index={index}
                    handleOnSubmit={handleOnSubmit} />
            </div>}
    </>
}