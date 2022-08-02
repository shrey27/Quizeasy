import "./result.css";
import { useAppSelector } from "../../utility";
import { HOMEPAGE } from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

type QUESTION = "String | null | undefined | Key";

export default function Result() {
  const navigate = useNavigate();
  const attemptedQuiz = useAppSelector((state) => state.users.attemptedQuiz);
  useEffect(() => {
    if (!attemptedQuiz.title.length) {
      navigate(HOMEPAGE, { replace: true });
    }
  }, [navigate, attemptedQuiz]);
  return (
    <div>
      <div className="quiz__body sm-s">
        <h1 className="title xl sb cen sm-s">RESULT</h1>
        <h1 className="title lg sb cen sm-s">{attemptedQuiz.title}</h1>
        <div className="flex-ct-sb subheading">
          <span className="score md">
            {`Questions : ${attemptedQuiz.questions.length}/${attemptedQuiz.questions.length}`}
          </span>
          <span className="score md">Score : {attemptedQuiz.score}</span>
        </div>
        <div className="rules sm-s">
          <ul>
            {attemptedQuiz.questions.map((element: QUESTION, index: Number) => {
              return (
                <li className="stack" key={element}>
                  <h1 className="question--title lg reg sm-s cen">{element}</h1>
                  <ul className="stack">
                    <li className="question">
                      <span
                        className={`options_label 
                                        ${
                                          attemptedQuiz.answers[
                                            Number(index)
                                          ] === "one"
                                            ? "right__label"
                                            : ""
                                        }
                                        ${
                                          attemptedQuiz.attempts[
                                            Number(index)
                                          ] !==
                                            attemptedQuiz.answers[
                                              Number(index)
                                            ] &&
                                          attemptedQuiz.attempts[
                                            Number(index)
                                          ] === "one"
                                            ? "wrong__label"
                                            : ""
                                        }`}
                      >
                        {attemptedQuiz.options[Number(index)].one}
                      </span>
                    </li>
                    <li className="question">
                      <span
                        className={`options_label 
                                        ${
                                          attemptedQuiz.answers[
                                            Number(index)
                                          ] === "two"
                                            ? "right__label"
                                            : ""
                                        }
                                        ${
                                          attemptedQuiz.attempts[
                                            Number(index)
                                          ] !==
                                            attemptedQuiz.answers[
                                              Number(index)
                                            ] &&
                                          attemptedQuiz.attempts[
                                            Number(index)
                                          ] === "two"
                                            ? "wrong__label"
                                            : ""
                                        }`}
                      >
                        {attemptedQuiz.options[Number(index)].two}
                      </span>
                    </li>
                    <li className="question">
                      <span
                        className={`options_label 
                                        ${
                                          attemptedQuiz.answers[
                                            Number(index)
                                          ] === "three"
                                            ? "right__label"
                                            : ""
                                        }
                                        ${
                                          attemptedQuiz.attempts[
                                            Number(index)
                                          ] !==
                                            attemptedQuiz.answers[
                                              Number(index)
                                            ] &&
                                          attemptedQuiz.attempts[
                                            Number(index)
                                          ] === "three"
                                            ? "wrong__label"
                                            : ""
                                        }`}
                      >
                        {attemptedQuiz.options[Number(index)].three}
                      </span>
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="nav--btn flex-ct-ct">
          <Link to={HOMEPAGE} className="btn btn--cancel--solid btn--result">
            <i className="fa-solid fa-house"></i> Go To Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
