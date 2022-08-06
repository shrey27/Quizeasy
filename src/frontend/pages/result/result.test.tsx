import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Result from "./index";
import * as router from "react-router";
import { userActions } from "../../store/userSlice";
import { act } from "react-dom/test-utils";

const sampledata = {
  answers: ["three", "two", "one", "two", "one"],
  attempts: ["two", "one", "two", "three", "two"],
  banner:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYZrolLAmIa9YZ4lIZSSxMOTTKXI14Om7H-g&usqp=CAU",
  description:
    "Interstellar is a 2014 epic science fiction film co-written, directed and produced by Christopher Nolan",
  options: [
    {
      two: "Tom Hardy",
      three: "Matthew McConaughey",
      one: "Will Smith",
    },
    {
      three: "Charlize Theron",
      two: "Anne Hathaway",
      one: "Jessica Chastain",
    },
    { two: "Antarctica", three: "France", one: "space" },
    { one: "USA", three: "Russia", two: "Canada" },
    { three: "Farmer", two: "Soldier", one: "Astronaut" },
  ],
  questions: [
    "Who is the protagonist of Interstellar ?",
    "Who is the lead female actress in the movie ? ",
    "Where does the protagonist travel to in the movie ?",
    "Where was the shooting primarily done for the movie ?",
    "Who was the protagonist portraying in the movie ?",
  ],
  quizId: "M1",
  score: 0,
  title: "Interstellar",
};

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

describe("Result Page Testing", () => {
  it("Result Testing", async () => {
    let { baseElement } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Result />
        </Provider>
      </BrowserRouter>
    );
    let title = screen.getByText(/Result/i);
    expect(title).toBeInTheDocument();

    await act(() => {
      store.dispatch(userActions.getAttemptedQuiz(sampledata));
    });

    let state = store.getState().users;
    expect(state.attemptedQuiz.title).toBe(sampledata.title);
    expect(state.attemptedQuiz.description).toBe(sampledata.description);
    expect(state.attemptedQuiz.quizId).toBe(sampledata.quizId);
    expect(state.attemptedQuiz.score).toBe(sampledata.score);
    expect(state.attemptedQuiz.questions.length).toBe(
      sampledata.questions.length
    );
    expect(state.attemptedQuiz.options.length).toBe(sampledata.options.length);
    expect(state.attemptedQuiz.banner).toBe(sampledata.banner);
    expect(state.attemptedQuiz.answers.length).toBe(sampledata.answers.length);
    expect(state.attemptedQuiz.attempts.length).toBe(
      sampledata.attempts.length
    );
  });
});
