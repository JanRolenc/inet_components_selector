import * as React from "react";
import * as ReactDOM from "react-dom";
import PersonsSelect from "./PersonsSelect/PersonsSelect";
import "./index.css";

ReactDOM.render(
  <PersonsSelect
    name="pers"
    required={false}
    disabled={false}
    selectAll={true} //výhledově dle přiřezených práv uživatele bude mít uživatel u tohoto true/false a tedy možnost pracovat i s nezařazenými
    selectedId={3}
    myId={2}
  />,
  document.getElementById("root")
);
