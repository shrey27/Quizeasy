import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Navbar } from "./index";
import * as router from "react-router";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

it("Navbar Modal", () => {
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
