import React, { Component, useState } from "react";
import Select from "react-select";
import UnitContainer from "./UnitContainer";
import { units } from "./docs/units";
import { IUnit, IUnitsSelect } from "./interfaces/interfaces";

const unitsStyles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: "auto",
    zIndex: "auto",
    width: "350px",
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

export default function UnitsSelect({
  unitsSelected,
  setUnitsSelected,
  setParentMenuOpen,
}: IUnitsSelect) {
  //  const [selectedUnits, setSelectedUnits] = useState<IUnit[]>([]);
  // const [menuIsOpen, setMenuIsOpen] = useState<boolean>(true);

  const handleInputChangeUnits = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, "");
    return inputValue;
  };
  const handleChangeUnits = (selUnits: any) => {
    // if (action.action !== "input-blur" && action.action !== "menu-close") {
    //   const selectedUnits = input.map((a: IUnit) => a.shortCs);
    setUnitsSelected(selUnits);
    console.log(selUnits);
    //      console.log(selectedUni);
    //    }
  };
  // const handleMenuIsOpen = () => {
  //   console.log("focused");
  //   const men = !menuIsOpen;
  //   setMenuIsOpen(!menuIsOpen);
  //   console.log("menuIsOpen", menuIsOpen);
  //   console.log("men", men);
  // };
  console.log("unitsSelected", unitsSelected);
  return (
    <Select
      isMulti={true}
      isClearable={true}
      isSearchable={false}
      placeholder="Filtr na součást MU ..."
      onFocus={() => setParentMenuOpen(true)}
      onBlur={() => setParentMenuOpen(undefined)}
      options={units}
      defaultValue={unitsSelected}
      getOptionValue={(option) => "" + option.id} //bez tohoto nefunguje nacteni options po prvnim vyberu multi
      formatOptionLabel={UnitContainer}
      styles={unitsStyles}
      //      onInputChange={handleInputChangeUnits} //asi neni potreba - nepotrebujeme filtrovat
      onChange={handleChangeUnits}
      // onFocus={handleMenuIsOpen} //nefunguje
    />
  );
}
