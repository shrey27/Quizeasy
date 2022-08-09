import "./rules.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RulesProps } from "../../utility";

export const Rules: React.FC<RulesProps> = ({ handleOnSubmit }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    handleOnSubmit();
  };
  const handleGoback = () => {
    navigate(-1);
  };
  return (
    <div>
      <h1 className="title xl sb cen">Rules of the quiz</h1>
      <div className="rules">
        <ul className="stack xs-s">
          <li className="flex-ct-st shadow xs-s rules__list">
            <span className="primary sm sb">
              <i className="fa-solid fa-circle-chevron-right"></i>All questions
              are compulsory
            </span>
          </li>
          <li className="flex-ct-st shadow xs-s rules__list">
            <span className="primary sm sb">
              <i className="fa-solid fa-circle-chevron-right"></i>
              You will have 35 seconds to attempt each question
            </span>
          </li>
          <li className="flex-ct-st shadow xs-s rules__list">
            <span className="primary sm sb">
              <i className="fa-solid fa-circle-chevron-right"></i> You need
              score above 60 to pass the quiz
            </span>
          </li>
          <li className="flex-ct-st shadow xs-s rules__list">
            <span className="primary sm sb">
              <i className="fa-solid fa-circle-chevron-right"></i> You can
              attempt a quiz only once
            </span>
          </li>
          <li className="flex-ct-st shadow xs-s rules__list">
            <span className="primary sm sb">
              <i className="fa-solid fa-circle-chevron-right"></i> You can quit
              a quiz, but you will not be able to attempt it again
            </span>
          </li>
        </ul>
        <div className="flex-ct-ct">
          <button
            className="btn btn--cancel--solid btn--rules sb"
            onClick={handleGoback}
            data-back-btn="BACK_BTN_RULES"
          >
            Go Back
          </button>
          <button
            className="btn btn--auth--solid btn--rules sb"
            onClick={handleClick}
            data-start-btn="START_BTN_RULES"
          >
            Start quiz
          </button>
        </div>
      </div>
    </div>
  );
};
