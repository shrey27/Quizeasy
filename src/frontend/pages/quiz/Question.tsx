import './quiz.css';
import React from 'react';
import { QuestionProps } from '../../utility';

export const Question: React.FC<QuestionProps> = ({ quizObject }) => {
    return <div>
        <main className="quiz__body">
            <h1 className="title xl sb cen sm-s">INCEPTION</h1>
            <div className="flex-ct-sb subheading">
                <span className="score md">Questions: 1/5</span>
                <span className="score md">Time Left: 02:46</span>
            </div>
            <div className="rules sm-s">
                <h1 className="question--title lg reg sm-s cen">
                    Who is the director of Inception?
                </h1>
                <ul className="stack">
                    <li className="question">
                        <input name="director" className="input__radio" type="radio" id="cn" />
                        <label className="input__label" htmlFor="cn">Christopher Nolan</label>
                    </li>
                    <li className="question">
                        <input name="director" className="input__radio" type="radio" id="ss" />
                        <label className="input__label" htmlFor="ss">Steven Speilberg</label>
                    </li>
                    <li className="question">
                        <input name="director" className="input__radio" type="radio" id="qt" />
                        <label className="input__label" htmlFor="qt">Quentin Tarantino</label>
                    </li>
                </ul>
                <div className="nav--btn flex-ct-sb">
                    <i className="fa-solid fa-angles-left xl"></i>
                    <span className="btn btn--cancel--solid md sb show--modal">End Quiz</span>
                    <i className="fa-solid fa-angles-right xl fl-rt"></i>
                </div>
            </div>
        </main></div>
}