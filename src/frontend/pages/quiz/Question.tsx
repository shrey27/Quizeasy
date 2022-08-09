import "./quiz.css";
import React from "react";
import { QuestionProps } from "../../utility";

export const Question: React.FC<QuestionProps> = ({
  question,
  options,
  attempts,
  setAttempts,
  index,
  handleOnSubmit,
  handleOnReset,
}) => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleOnSubmit();
  };

  const handleReset = () => {
    handleOnReset();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let temp = [...attempts];
    temp[Number(index)] = e.target.id;
    setAttempts(temp);
  };

  return (
    <div>
      <div className="sm-s">
        <h1 className="question-title md reg xs-s cen">{question}</h1>
        <form onSubmit={handleSubmit}>
          <ul className="stack">
            <li className="question">
              <input
                name="quizQuestion"
                className="input__radio"
                type="radio"
                id="one"
                checked={attempts[Number(index)] === "one" ? true : false}
                onChange={handleChange}
              />
              <label className="input__label" htmlFor="one">
                {options.one}
              </label>
            </li>
            <li className="question">
              <input
                name="quizQuestion"
                className="input__radio"
                type="radio"
                id="two"
                checked={attempts[Number(index)] === "two" ? true : false}
                onChange={handleChange}
              />
              <label className="input__label" htmlFor="two">
                {options.two}
              </label>
            </li>
            <li className="question">
              <input
                name="quizQuestion"
                className="input__radio"
                type="radio"
                id="three"
                checked={attempts[Number(index)] === "three" ? true : false}
                onChange={handleChange}
              />
              <label className="input__label" htmlFor="three">
                {options.three}
              </label>
            </li>
          </ul>
          <div className="nav--btn flex-ct-sb">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn--cancel--solid btn--question md sb"
              data-end-quiz="END_QUIZ"
            >
              End Quiz
            </button>
            <button
              type="submit"
              className={
                !attempts[Number(index)]
                  ? "btn btn--disabled btn--question md sb"
                  : "btn btn--auth--solid btn--question md sb"
              }
              disabled={!attempts[Number(index)]}
              data-next-question="NEXT_QUESTION"
            >
              Next Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
