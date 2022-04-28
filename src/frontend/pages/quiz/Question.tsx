import './quiz.css';
import React from 'react';
import { QuestionProps } from '../../utility';

export const Question: React.FC<QuestionProps> = ({ question, options }) => {
    return <div>
        <div className="rules sm-s">
            <h1 className="question--title lg reg sm-s cen">
                {question}
            </h1>
            <ul className="stack">
                <li className="question">
                    <input name="director" className="input__radio" type="radio" id="cn" />
                    <label className="input__label" htmlFor="cn">{options.one}</label>
                </li>
                <li className="question">
                    <input name="director" className="input__radio" type="radio" id="ss" />
                    <label className="input__label" htmlFor="ss">{options.two}</label>
                </li>
                <li className="question">
                    <input name="director" className="input__radio" type="radio" id="qt" />
                    <label className="input__label" htmlFor="qt">{options.three}</label>
                </li>
            </ul>
            <div className="nav--btn flex-ct-sb">
                <i className="fa-solid fa-angles-left xl"></i>
                <span className="btn btn--cancel--solid md sb show--modal">End Quiz</span>
                <i className="fa-solid fa-angles-right xl fl-rt"></i>
            </div>
        </div>
    </div>
}