import React from "react";
import { IUnit } from "./interfaces/interfaces";

interface Props {
  unit: IUnit;
  onClickSelectUnit(unitNameToSelect: any): void;
}

const OptionMenu = ({ unit, onClickSelectUnit }: Props) => {
  return (
    <span
      className="unit-container-menu"
      onClick={() => onClickSelectUnit(unit.id)} //! kdyz dam takto jako param primo id, tak pak ve funkci nemusim pouzit event a target
      title={unit.nameCs}
    >
      &#160;&#160;
      <span
        style={{
          height: "10px",
          width: "10px",
          borderRadius: "50%",
          display: "inline-block",
          backgroundColor: unit.color,
        }}
      ></span>
      &#160;{unit.shortCs}
    </span>
  );
};
export default OptionMenu;
//&#160;-&#160;{unit.nameCs}
