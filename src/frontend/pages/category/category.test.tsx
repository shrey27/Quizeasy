import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Category from "./index";
import { userActions } from "../../store/userSlice";
import { act } from "react-dom/test-utils";

describe("Movie category page", () => {
  it("Movies", async () => {
    let { baseElement } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Category />
        </Provider>
      </BrowserRouter>
    );

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({
        categoryId: "movies",
      }),
    }));

    let LOADER = screen.getAllByAltText("loader")[0];
    expect(LOADER).toBeInTheDocument();

    await act(() => {
      store.dispatch(
        userActions.getAttemptedQuiz({
          quizId: "QI_1",
          title: "",
          questions: [],
          answers: [],
          options: [{ one: "", two: "", three: "" }],
          attempts: [],
          score: 0,
          banner: "",
          description: "",
        })
      );
    });
    let state = store.getState().users;
    expect(state.attemptedQuiz.quizId).toBe("QI_1");
  });
});
