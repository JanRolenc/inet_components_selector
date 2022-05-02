import React from "react";
import { IUnit, FormatOptionLabelMeta } from "./interfaces/interfaces";
import "./UnitContainer.scss";

const UnitContainer = (unit: IUnit, meta: FormatOptionLabelMeta) => {
  return meta.context === "menu" ? (
    <div className="unit-container unit-container--menu">
      <span
        className="unit-container__circle"
        style={{
          backgroundColor: unit.color,
        }}
      ></span>
      <span>&#160;&#160;</span>
      <span>{unit.shortCs}</span>
      <span>&#160;-&#160;</span>
      <span>{unit.nameCs}</span>
    </div>
  ) : (
    <div className="unit-container unit-container--input">
      <span
        className="unit-container__circle"
        style={{
          backgroundColor: unit.color,
        }}
      ></span>
      <span>&#160;&#160;</span>
      <span>{unit.shortCs}</span>
    </div>
  );
};
export default UnitContainer;
