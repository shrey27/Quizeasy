import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LeaderBoard from "./index";

describe("LeaderBoard Testing", () => {
  it("Test Leaderboard", async () => {
    let { baseElement } = render(
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
    await fireEvent.click(updateBtn);
    screen.queryAllByText(/old password/i);
  });
});
