import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./index";

test("NotFound", async () => {
  let { baseElement } = render(
    <BrowserRouter>
      <Provider store={store}>
        <NotFound />
      </Provider>
    </BrowserRouter>
  );
  let title = screen.getByText(/404 Error Found!/i);
  expect(title).toBeInTheDocument();
  let link = screen.getByText(/Go back to Homepage/i);
  expect(title).toBeInTheDocument();
  let banner = screen.getAllByAltText(/404/i)[0];
  expect(banner).toBeInTheDocument();
});
