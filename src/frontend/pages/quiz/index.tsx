import './quiz.css';
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'
// import { useQuizId } from '../../utility';
import { Question } from './Question';
import { sampleQuizObject } from '../../utility';
import { useNavigate } from 'react-router-dom';
import { HOMEPAGE } from '../../routes';

// const defaultState = {
//     title: '',
//     questions: [],
//     answers: [],
//     options: []
// }
const TIME = 35;

export default function Quiz() {
    // const { quizId } = useParams();
    // const quizObject = useQuizId(`${quizId}`) ?? defaultState;
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
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

    return <div>
        <main className="quiz__body"><h1 className="title xl sb cen sm-s">{sampleQuizObject.title}</h1>
            <div className="flex-ct-sb subheading">
                <span className="score md">Questions: {index + 1}/{sampleQuizObject.questions.length}</span>
                <span className="score md">
                    Time Left: 00:{time < 10 ? `0${time}` : time}
                </span>
            </div>
            <Question
                question={sampleQuizObject.questions[index]}
                options={sampleQuizObject.options[index]}
                attempts={attempts}
                setAttempts={setAttempts}
                index={index}
                handleOnSubmit={handleOnSubmit} />
        </main>
    </div>
}