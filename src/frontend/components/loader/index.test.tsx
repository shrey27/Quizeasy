import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Loader } from "./index";

test("Loader Image", async () => {
  render(<Loader />);
  let loaderImage = screen.queryByAltText(/loader/i);
  expect(loaderImage).toBeInTheDocument();
});
