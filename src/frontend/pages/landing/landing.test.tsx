import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Landing from "./index";

test("Landing", async () => {
  let { baseElement } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Landing />
      </Provider>
    </BrowserRouter>
  );
  let title = screen.getByAltText(/banner/i);
  expect(title).toBeInTheDocument();
  let subtext = screen.getByText(/Let's quiz it/i);
  expect(subtext).toBeInTheDocument();
  let para = screen.getByText(
    /QuizEasy is a miniature quiz taking web-app. It's simple, easy to use, challenging and fun./i
  );
  expect(para).toBeInTheDocument();
});
