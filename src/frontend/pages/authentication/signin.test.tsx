import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import * as router from "react-router";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Signin from "./Signin";

const navigate = jest.fn();

beforeEach(() => {
  jest
    .spyOn(router, "useNavigate")
    .mockImplementation(() => navigate("/homepage"));
});

it("SignIn Modal", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Signin />
      </Provider>
    </BrowserRouter>
  );
    fireEvent.click(screen.getByText(/Guest Credentials/i));
    expect(screen.getByRole('input'))
//   fireEvent.click(screen.getByText(/SIGN IN/i));
//   expect(screen.getByText(/Movies/i)).toBeInTheDocument();
});
