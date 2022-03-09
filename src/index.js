import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";

const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
