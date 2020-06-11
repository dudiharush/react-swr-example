import * as React from "react";
import { render } from "react-dom";
import { ReactQueryDevtools } from "react-query-devtools";
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </>,
  rootElement
);
