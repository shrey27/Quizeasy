import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LeaderBoard from "./index";
import { act } from "react-dom/test-utils";

describe("LeaderBoard Testing", () => {
  it("Test Leaderboard", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LeaderBoard />
        </Provider>
      </BrowserRouter>
    );
    screen.queryAllByText(/leaderboard/i);
    screen.queryAllByText(/profile/i);
    screen.queryAllByText(/your attempted quiz/i);
    screen.queryAllByText(/total coins/i);
    let updateBtn = screen.getByText(/update/i);
    expect(updateBtn).toBeDefined();
    await act(async () => {
      await fireEvent.click(updateBtn);
    });

    screen.queryAllByText(/old password/i);
  });
});
