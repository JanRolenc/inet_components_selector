import React, { Component, useState } from "react";
import { units } from "./docs/units";
import OptionMenu from "./OptionMenu";
import OptionInput from "./OptionInput";
import { IUnit, IUnitsFilterCustom } from "./interfaces/interfaces";

function UnitsFilterCustom({
  unitsSelected,
  setUnitsSelected,
}: IUnitsFilterCustom) {
  const [popUpClicked, setPopUpClicked] = useState(false);
  const [unitsList, setUnitsList] = useState<IUnit[]>(units);

  const onClickPopUp = () => {
    setPopUpClicked(!popUpClicked);
  };

  const onClickUnitMenu = (unitIdToSelect: string) => {
    // console.log("unitsList puvodni", unitsList);
    // const newUnitsList = unitsList.filter((u) => u.id !== unitIdToSelect);
    // console.log("newList", newUnitsList);
    // setUnitsList(newUnitsList);
    console.log("unitsList novy", unitsList);
    const selectedUnitMenu = unitsList.filter(
      (u) => u.id === unitIdToSelect
    )[0];
    setUnitsSelected([...unitsSelected, selectedUnitMenu]);
    console.log("unitsSelected", unitsSelected);
  };

  const onClickUnitClearIndicator = (unitIdToRemove: string) => {
    console.log("unitsSelected puvodni", unitsSelected);
    setUnitsSelected(unitsSelected.filter((u) => u.id !== unitIdToRemove));
    console.log("unitsSelected po odstraneni vybrane", unitsSelected);

    // console.log("unitsList puvodni", unitsList);
    // const selectedUnitInput = units.filter((u) => u.id === unitIdToRemove)[0];
    // console.log("selectedInputUnit", selectedUnitInput);
    // setUnitsList([...unitsList, selectedUnitInput]);
    // console.log("unitsList po pridani smazane z inputu", unitsList);
  };

  const onClickInputClearIndicator = () => {
    setUnitsSelected([]);
  };

  return (
    <div>
      <div className="unit-select-container">
        <div className="input-container" onClick={onClickPopUp}>
          {unitsSelected.length > 0 ? (
            unitsSelected.map((unit: IUnit) => (
              <OptionInput
                key={unit.id}
                unit={unit}
                onClickUnitInputClearIndicator={(id) =>
                  onClickUnitClearIndicator(id)
                }
              />
            ))
          ) : (
            <span>Vyber fakultu...</span>
          )}
        </div>
        <div className="indicators-container">
          <div className="clear-indicator" onClick={onClickInputClearIndicator}>
            <svg>
              <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
            </svg>
          </div>
          <span className="select__indicator-separator css-1okebmr-indicatorSeparator"></span>
          <div className="dropdown-indicator" onClick={onClickPopUp}>
            <svg>
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </div>
        </div>
      </div>
      {popUpClicked && (
        <div className="popup-container">
          {unitsList.length
            ? unitsList
                .filter((u) => unitsSelected.every((s) => u.id !== s.id))
                .map((unit: IUnit) => (
                  <OptionMenu
                    key={unit.id}
                    unit={unit}
                    onClickUnitMenu={(id) => onClickUnitMenu(id)}
                  />
                ))
            : null}
        </div>
      )}
    </div>
  );
}

export default UnitsFilterCustom;
