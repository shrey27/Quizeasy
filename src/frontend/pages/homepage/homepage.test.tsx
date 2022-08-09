import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Homepage from "./index";

test("Homepage", async () => {
  let { baseElement } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Homepage />
      </Provider>
    </BrowserRouter>
  );
  let homepageText = baseElement.querySelector(
    '[data-home-category="HOME_CATEGORY"]'
  );
  let movies = screen.getByText(
    /A collection of quiz based on highly acclaimed movies of all time./i
  );
  expect(movies).toBeInTheDocument();
  let series = screen.getByText(
    /A collection of quiz based on mind-boggling shows of last decade./i
  );
  expect(series).toBeInTheDocument();
  let books = screen.getByText(
    /A collection of quiz based on the greatest books of all time./i
  );
  expect(books).toBeInTheDocument();
  let music = screen.getByText(
    /A collection of quiz based on top songs, music-composers, song writers and lyricists of last decade./i
  );
  expect(music).toBeInTheDocument();
  expect(homepageText).toBeInTheDocument();
});
