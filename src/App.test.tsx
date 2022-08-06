import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { store } from "./frontend/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeContext } from "./frontend/context";
import App from "./App";
import { act } from "react-dom/test-utils";
import { Navbar } from "./frontend/components";

describe("Theme Test", () => {
  it("Testing theme swithcing buttons on Navbar", async () => {
    let { baseElement } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeContext.Provider
            value={{ theme: "dark", switchTheme: jest.fn() }}
          >
            <Navbar />
          </ThemeContext.Provider>
        </Provider>
      </BrowserRouter>
    );
    // let darkBtn: any = baseElement.querySelector('[data-dark="DARK_THEME"]');
    let lightBtn: any = baseElement.querySelector('[data-light="LIGHT_THEME"]');
    await act(async () => {
      await fireEvent.click(lightBtn);
    });

    let appTheme = document.querySelector('[data-theme="light"]');
    expect(appTheme).toBeDefined();
  });
});
