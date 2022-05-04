import { IUnit } from '../interfaces/interfaces'

interface Props {
  unit: IUnit
  onClickUnitMenu(unitIdToSelect: string): void
}

const OptionMenu = ({ unit, onClickUnitMenu }: Props) => {
  return (
    <span
      className="unit-container__menu"
      onClick={() => onClickUnitMenu(unit.id)}
      title={unit.nameCs}
    >
      <span
        className="unit-container__circle"
        style={{ backgroundColor: unit.color }}
      ></span>
      <span style={{ marginRight: '3px' }}>{unit.shortCs}</span>
    </span>
  )
}
export default OptionMenu
