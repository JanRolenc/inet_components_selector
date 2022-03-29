import * as React from "react";
import * as ReactDOM from "react-dom";
import PersonsSelect from "./PersonsSelect/PersonsSelect";
import "./index.css";

ReactDOM.render(
  <PersonsSelect
    name="pers"
    required={false}
    disabled={false}
    selectedId={4}
  />,
  document.getElementById("root")
);
