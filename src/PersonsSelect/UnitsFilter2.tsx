import React, { Component, useState } from "react";
import { units } from "./docs/units";
import { IUnit, IUnitsFilter2 } from "./interfaces/interfaces";

function UnitsFilter2(unitValue: IUnitsFilter2, handleChange: any) {
  let unitsOptions =
    units.length > 0 &&
    units.map((item, i) => {
      return (
        <option key={i} value={item.nameCs}>
          {item.nameCs}
        </option>
      );
    });
  return (
    <div style={{ width: "400px" }}>
      <select
        style={{ width: "100%" }}
        // value={unitValue}
        onChange={handleChange}
      >
        <option key={0} value="Vyber fakulty">
          Vyber fakulty
        </option>
        {unitsOptions}
      </select>
    </div>
  );
}

export default UnitsFilter2;
