import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Category from "./index";
import * as hooks from "../../utility/hooks";

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

    jest.spyOn(hooks, "useCategoryId").mockImplementation(() => [
      {
        id: "Q1",
        title: "Quiz data",
        description: "description",
        banner: "banner",
        questions: ["random"],
        answers: ["random"],
        options: [{ one: "one", two: "two", three: "three" }],
      },
    ]);
    // let quizData = await hooks.useCategoryId("movies");
    // let subtext = screen.getByText(/Pick a quiz from these options/i);
    // expect(subtext).toBeInTheDocument();
  });
});
