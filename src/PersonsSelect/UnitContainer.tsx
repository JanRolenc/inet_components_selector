import React from "react";
import { IUnit, FormatOptionLabelMeta } from "./interfaces/interfaces";
import "./UnitContainer.scss";

const UnitContainer = (unit: IUnit, meta: FormatOptionLabelMeta) => {
  return meta.context === "menu" ? (
    <div className="unit-container-menu">
      <span
        style={{
          height: "10px",
          width: "10px",
          borderRadius: "50%",
          display: "inline-block",
          backgroundColor: unit.color,
        }}
      ></span>
      <span>&#160;&#160;</span>
      <span>{unit.shortCs}</span>
      <span>&#160;-&#160;</span>
      <span>{unit.nameCs}</span>
    </div>
  ) : (
    <div className="unit-container-input">
      <span
        style={{
          height: "10px",
          width: "10px",
          borderRadius: "50%",
          display: "inline-block",
          backgroundColor: unit.color,
        }}
      ></span>
      <span>&#160;&#160;</span>
      <span>{unit.shortCs}</span>
    </div>
  );
};
export default UnitContainer;
