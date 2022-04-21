import React from "react";
import { IUnit } from "./interfaces/interfaces";

interface Props {
  unit: IUnit;
  onClickUnitMenu(unitIdToSelect: string): void;
}

const OptionMenu = ({ unit, onClickUnitMenu }: Props) => {
  return (
    <span
      className="unit-container-menu"
      onClick={() => onClickUnitMenu(unit.id)} //!kdyz dam takto jako param primo id, tak pak ve funkci nemusim pouzit event a target
      title={unit.nameCs}
    >
      <span
        className="unit-circle"
        style={{ backgroundColor: unit.color }}
      ></span>
      <span style={{ marginRight: "3px" }}>{unit.shortCs}</span>
    </span>
  );
};
export default OptionMenu;
