import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "./index";
import * as router from "react-router";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { userActions } from "../../store/userSlice";
import { act } from "react-dom/test-utils";

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

describe("Render navbar", () => {
  it("Navbar", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Navbar />
        </Provider>
      </BrowserRouter>
    );
    let logoImage = screen.queryByAltText(/logo/i);
    expect(logoImage).toBeInTheDocument();
  });
});

describe("Checkout Logout", () => {
  it("Navbar Modal", async () => {
    let { baseElement } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Navbar />
        </Provider>
      </BrowserRouter>
    );

    act(() => {
      store.dispatch(
        userActions.getToken({
          token: "SOME_TOKEN",
        })
      );
    });
    let state = store.getState().users;
    expect(state.token).toBeTruthy();

    let logoutButton: any = baseElement.querySelector('[data-auth="LOGOUT"]');
    expect(logoutButton).toBeDefined();

    fireEvent.click(logoutButton);
    expect(screen.queryAllByText(/Are you sure you want to signout ?/i));
  });
});
