import React from 'react'
import { IUnit } from './interfaces/interfaces'

interface Props {
  unit: IUnit
  onClickUnitInputClearIndicator(unitIdToRemove: string): void
}

const OptionInput = ({ unit, onClickUnitInputClearIndicator }: Props) => {
  return (
    <div className="unit-container__input" title={unit.nameCs}>
      <span
        className="unit-container__circle"
        style={{ backgroundColor: unit.color }}
      ></span>
      {/* <span style={{ marginRight: '3px' }}>{unit.shortCs}</span> */}
      <span>{unit.shortCs}</span>
      <div
        className="clear-indicator-unit-container"
        onClick={() => onClickUnitInputClearIndicator(unit.id)}
      >
        <svg>
          <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
        </svg>
      </div>
    </div>
  )
}
export default OptionInput
