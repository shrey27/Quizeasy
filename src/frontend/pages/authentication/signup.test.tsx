import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Signup";
import { userActions } from "../../store/userSlice";

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

    await act(() => {
      store.dispatch(userActions.getToken("SOME_TOKEN"));
    });

    let state = store.getState().users;
    expect(state.token).toBe("SOME_TOKEN");

    await act(() => {
      store.dispatch(
        userActions.getUser({
          uid: "uid",
          email: "randomEmail@xyz.com",
          quiz: [],
          username: "random",
          score: 0,
        })
      );
    });

    state = store.getState().users;
    expect(state.userInfo.email).toBe("randomEmail@xyz.com");
    expect(state.userInfo.username).toBe("random");
  });
});
