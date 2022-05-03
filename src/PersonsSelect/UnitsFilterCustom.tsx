import React, { Component, useState, Fragment } from 'react'
import { units } from './docs/units'
import OptionMenu from './OptionMenu'
import OptionInput from './OptionInput'
import { IUnit, IUnitsFilterCustom } from './interfaces/interfaces'

function UnitsFilterCustom({
  unitsSelected,
  setUnitsSelected,
}: IUnitsFilterCustom) {
  const [popUpClicked, setPopUpClicked] = useState(false)
  const [unitsList, setUnitsList] = useState<IUnit[]>(units)

  const onClickPopUp = () => {
    setPopUpClicked(!popUpClicked)
  }

  const onClickUnitMenu = (unitIdToSelect: string) => {
    const selectedUnitMenu = unitsList.filter((u) => u.id === unitIdToSelect)[0]
    setUnitsSelected([...unitsSelected, selectedUnitMenu])
    //zmeny v seznamu fakult v menu (unitsList) provadime nize v return
  }

  const onClickUnitClearIndicator = (unitIdToRemove: string) => {
    setUnitsSelected(unitsSelected.filter((u) => u.id !== unitIdToRemove))
    //zmeny v seznamu fakult v menu (unitsList) provadime nize v return
  }

  const onClickInputClearIndicator = () => {
    setUnitsSelected([])
  }

  return (
    <Fragment>
      <div className="units-select">
        <div className="unit-container" onClick={onClickPopUp}>
          {unitsSelected.length > 0 ? (
            unitsSelected.map((unit: IUnit, key: number) => (
              <OptionInput
                key={key}
                unit={unit}
                onClickUnitInputClearIndicator={(id) =>
                  onClickUnitClearIndicator(id)
                }
              />
            ))
          ) : (
            <div className="unit-container__input unit-container__input--nounit">
              <span>Vyber fakultu...</span>
            </div>
          )}
          {/* </div> */}
        </div>
        <div className="units-select__indicators">
          <div
            className="units-select__indicators__clear"
            onClick={onClickInputClearIndicator}
          >
            <svg>
              <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
            </svg>
          </div>
          <span className="units-select__indicators__separator css-1okebmr-indicatorSeparator"></span>
          <div
            className="units-select__indicators__dropdown"
            onClick={onClickPopUp}
          >
            <svg>
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </div>
        </div>
      </div>
      {popUpClicked && (
        <div className="units-popup-container">
          <div className="unit-container">
            {unitsList.length
              ? unitsList
                  .filter((u) => unitsSelected.every((s) => u.id !== s.id)) //!!!srovnani dvou poli
                  .map((unit: IUnit, key: number) => (
                    <OptionMenu
                      key={key}
                      unit={unit}
                      onClickUnitMenu={(id) => onClickUnitMenu(id)}
                    />
                  ))
              : null}
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default UnitsFilterCustom
