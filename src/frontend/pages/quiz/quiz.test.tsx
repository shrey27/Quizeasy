import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Question } from "./Question";
import * as router from "react-router";
import Quiz from ".";

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

describe("Quiz Page Testing", () => {
  it("Quiz Testing", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Quiz />
        </Provider>
      </BrowserRouter>
    );
    let { baseElement } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Question
            question={"Who plays the role of Tommy Shelby on the show ?"}
            options={{
              one: "Cilian Murphy",
              three: "Tom hardy",
              two: "Jude Law",
            }}
            attempts={new Array(5)}
            setAttempts={jest.fn()}
            index={0}
            handleOnSubmit={jest.fn()}
            handleOnReset={jest.fn()}
          />
        </Provider>
      </BrowserRouter>
    );
    let question = screen.getByText(
      /Who plays the role of Tommy Shelby on the show ?/i
    );
    expect(question).toBeInTheDocument();

    let option_1 = screen.getByText(/Cilian Murphy/i);
    expect(option_1).toBeInTheDocument();

    let option_2 = screen.getByText(/Tom hardy/i);
    expect(option_2).toBeInTheDocument();

    let option_3 = screen.getByText(/Jude Law/i);
    expect(option_3).toBeInTheDocument();

    let input: any = baseElement.querySelector("#one");
    input.checked = true;

    let nextBtn: any = baseElement.querySelector(
      '[data-next-question="NEXT_QUESTION"]'
    );
    expect(nextBtn).toBeDefined();
    await act(async () => {
      await fireEvent.click(nextBtn);
    });

    expect(screen.queryAllByText(/In which time, the story is set ?/i));

    let backBtn: any = baseElement.querySelector('[data-end-quiz="END_QUIZ"]');
    expect(backBtn).toBeDefined();

    await act(async () => {
      await fireEvent.click(backBtn);
    });

    expect(
      screen.queryAllByText(/Who plays the role of Tommy Shelby on the show ?/i)
    );
  });
});
