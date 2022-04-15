import React from 'react'
import { IUnit } from './interfaces/interfaces'

interface Props {
  unit: IUnit
  onClickSelectUnit(unitNameToSelect: any): void
}

const OptionInput = ({ unit, onClickSelectUnit }: Props) => {
  return (
    <div
      className="unit-container-input"
      onClick={() => onClickSelectUnit(unit.id)}
      title={unit.nameCs}
    >
      <span
        style={{
          height: '10px',
          width: '10px',
          borderRadius: '50%',
          display: 'inline-block',
          backgroundColor: unit.color,
        }}
      ></span>
      {/* &#160; */}
      <span style={{ padding: '5px 12px 5px 6px' }}>{unit.shortCs}</span>
      {/* &#160;&#160; */}
      <div className="clear-indicator-unit-container">
        <span className="clear-indicator-unit">x</span>
      </div>
    </div>
  )
}
export default OptionInput
