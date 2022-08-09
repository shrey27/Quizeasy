import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Rules } from "./index";
import { act } from "react-dom/test-utils";

describe("Rules Page Testing", () => {
  it("Rules ", async () => {
    const submitSpy = jest.fn();
    let { baseElement } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Rules handleOnSubmit={submitSpy} />
        </Provider>
      </BrowserRouter>
    );

    let title = screen.getByText(/Rules of the quiz/i);
    expect(title).toBeInTheDocument();

    const startBtn: any = baseElement.querySelector(
      '[data-start-btn="START_BTN_RULES"]'
    );
    const backBtn: any = baseElement.querySelector(
      '[data-back-btn="BACK_BTN_RULES"]'
    );

    await act(async () => {
      await fireEvent.click(backBtn);
    });

    expect(screen.queryAllByAltText(/Pick a quiz from these options/i));
    await act(async () => {
      await fireEvent.click(startBtn);
    });

    expect(screen.queryAllByAltText(/Time Left/i));
  });
});
