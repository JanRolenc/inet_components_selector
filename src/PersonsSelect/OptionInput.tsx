import React from "react";
import { IUnit } from "./interfaces/interfaces";

interface Props {
  unit: IUnit;
  onClickSelectUnit(unitNameToSelect: any): void;
}

const OptionInput = ({ unit, onClickSelectUnit }: Props) => {
  return (
    <span
      className="unit-container-input"
      onClick={() => onClickSelectUnit(unit.id)}
      title={unit.nameCs}
    >
      <span
        style={{
          height: "10px",
          width: "10px",
          borderRadius: "50%",
          display: "inline-block",
          backgroundColor: unit.color,
        }}
      ></span>
      &#160;
      {unit.shortCs}
      &#160;&#160;
      <span className="clear-indicator-unit">x</span>
    </span>
  );
};
export default OptionInput;
