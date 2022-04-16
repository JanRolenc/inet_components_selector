import React from 'react'
import { IUnit } from './interfaces/interfaces'

interface Props {
  unit: IUnit
  onClickUnitInputClearIndicator(unitNameToRemove: string): void
}

const OptionInput = ({ unit, onClickUnitInputClearIndicator }: Props) => {
  return (
    <div className="unit-container-input" title={unit.nameCs}>
      <span
        style={{
          height: '10px',
          width: '10px',
          borderRadius: '50%',
          display: 'inline-block',
          backgroundColor: unit.color,
        }}
      ></span>
      <span style={{ padding: '5px 12px 5px 6px' }}>{unit.shortCs}</span>
      <div
        className="clear-indicator-unit-container"
        onClick={() => onClickUnitInputClearIndicator(unit.id)}
      >
        {/* <svg viewBox="0 0 10 10" width="10" height="10"> */}
        <svg>
          <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
        </svg>
        {/* </span> */}
      </div>
    </div>
  )
}
export default OptionInput
