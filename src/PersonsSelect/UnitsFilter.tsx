import React, { Component, useState } from "react";
import Select from "react-select";
import UnitContainer from "./UnitContainer";
import { units } from "./docs/units";
import { IUnit, IUnitsFilter } from "./interfaces/interfaces";

const unitsStyles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: "auto",
    zIndex: "auto",
    width: "auto",
  }),
  option: (styles: any, { isFocused }: any) => ({
    ...styles,
    backgroundColor: isFocused ? "#999" : undefined,
    color: isFocused ? "white" : undefined,
    zIndex: 1,
  }),
  menu: (styles: any) => ({
    ...styles,
    color: "#555",
    zIndex: 100,
    width: "350px",
  }),
  //uzsi input
  dropdownIndicator: (styles: any) => ({
    ...styles,
    padding: "3px",
  }),
  clearIndicator: (styles: any) => ({
    ...styles,
    padding: "3px",
  }),
};

const promiseOptionsUnits = () =>
  new Promise<IUnit[]>((resolve) => {
    setTimeout(() => {
      resolve(units.map((a) => a));
    }, 500);
  });

export default function UnitsFilter({
  unitsSelected,
  setUnitsSelected,
  setParentMenuOpen,
}: IUnitsFilter) {
  const handleChangeUnits = (selUnits: any) => {
    setUnitsSelected(selUnits);
  };
  return (
    <Select
      isMulti={true}
      isClearable={true}
      isSearchable={false}
      placeholder="Vyber fakulty ..."
      components={{ Input: (props: any) => <div></div> }}
      onFocus={() => setParentMenuOpen(true)}
      onBlur={() => setParentMenuOpen(undefined)}
      options={units}
      defaultValue={unitsSelected}
      getOptionValue={(option) => "" + option.id} //bez tohoto nefunguje nacteni options po prvnim vyberu multi
      formatOptionLabel={UnitContainer}
      styles={unitsStyles}
      onChange={handleChangeUnits}
    />
  );
}
