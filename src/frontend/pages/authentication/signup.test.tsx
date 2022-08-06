import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Signup";

describe("Sign In Page Authentication", () => {
  it("SignUp Form", async () => {
    let { baseElement } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Signup />
        </Provider>
      </BrowserRouter>
    );
    let guestCredBtn: any = baseElement.querySelector(
      '[data-guest="GUEST_CRED_SIGNUP"]'
    );
    let submitBtn: any = baseElement.querySelector(
      '[data-auth_signin="SIGN_UP"]'
    );

    await act(async () => {
      await fireEvent.click(guestCredBtn);
    });

    await act(async () => {
      await fireEvent.click(submitBtn);
    });

    let LOADER = screen.getAllByAltText("loader")[0];
    expect(LOADER).toBeInTheDocument();
  });
});
