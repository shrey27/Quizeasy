import './quiz.css';
import React from 'react';
import { QuestionProps } from '../../utility';

export const Question: React.FC<QuestionProps> = (
    { question, options, attempts, setAttempts, index, handleOnSubmit }) => {

    const handleSubmit = (e: any) => {
        e.preventDefault();
        handleOnSubmit();
    }

    const handleOnReset = (e: any) => {
        e.preventDefault();
    }

    const handleChange = (e: any) => {
        e.preventDefault();
        let temp = [...attempts];
        temp[Number(index)] = e.target.id;
        setAttempts(temp);
    }

    return <div>
        <div className="sm-s">
            <h1 className="question-title md reg xs-s cen">
                {question}
            </h1>
            <form onSubmit={handleSubmit} onReset={handleOnReset}>
                <ul className="stack">
                    <li className="question">
                        <input name="quizQuestion"
                            className="input__radio"
                            type="radio"
                            id="one"
                            checked={attempts[Number(index)] === 'one' ? true : false}
                            onChange={handleChange} />
                        <label className="input__label" htmlFor="one">{options.one}</label>
                    </li>
                    <li className="question">
                        <input name="quizQuestion"
                            className="input__radio"
                            type="radio"
                            id="two"
                            checked={attempts[Number(index)] === 'two' ? true : false}
                            onChange={handleChange} />
                        <label className="input__label" htmlFor="two">{options.two}</label>
                    </li>
                    <li className="question">
                        <input name="quizQuestion"
                            className="input__radio"
                            type="radio"
                            id="three"
                            checked={attempts[Number(index)] === 'three' ? true : false}
                            onChange={handleChange} />
                        <label className="input__label" htmlFor="three">{options.three}</label>
                    </li>
                </ul>
                <div className="nav--btn flex-ct-sb">
                    <button type='reset'
                        className="btn btn--cancel--solid btn--question md sb">End Quit</button>
                    <button type='submit'
                        className={!attempts[Number(index)] ?
                            "btn btn--disabled btn--question md sb" :
                            "btn btn--auth--solid btn--question md sb"}
                        disabled={!attempts[Number(index)]}>Next Question</button>
                </div>
            </form>
        </div>
    </div>
}