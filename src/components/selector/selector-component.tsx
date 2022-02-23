import React, { Component, Fragment } from "react";
import Select from "react-select";

import { personsList } from "../../docs/personsList";
import "./selector-component.scss";
import PersonContainer from "../person-container/person-container";

function Selector() {
  return (
    <div style={{ width: "50vw", marginTop: "50px" }}>
      <Select
        placeholder="Vyhledej..."
        options={personsList}
        formatOptionLabel={PersonContainer}
      />
    </div>
  );
}

export default Selector;
