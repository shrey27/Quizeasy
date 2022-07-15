import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignoutModal } from "./SignoutModal";
import LeaderBoard from "../../pages/leaderboard";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

test("Profile Modal", async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LeaderBoard />
      </Provider>
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText(/update/i));
  expect(screen.queryByLabelText(/Username/i)).toBeInTheDocument();
  expect(screen.queryByLabelText(/Email ID/i)).toBeInTheDocument();
  expect(screen.queryByLabelText(/Old Password/i)).toBeInTheDocument();
  expect(screen.queryByLabelText(/New Password/i)).toBeInTheDocument();
});

test("Signout Modal", async () => {
  let props = {
    setSignoutModal: () => {},
    handleDispatch: () => {},
  };
  render(<SignoutModal {...props} />);
  let queryText = screen.queryByText(/Are you sure you want to signout/i);
  expect(queryText).toBeInTheDocument();
});
