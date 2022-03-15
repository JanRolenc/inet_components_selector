import * as React from "react";
import * as ReactDOM from "react-dom";
import Selector from "./components/selector/selectorComponent";
import "./index.css";

ReactDOM.render(
  <Selector name="pers" required={false} disabled={false} selectedId={4} />,
  document.getElementById("root")
);
