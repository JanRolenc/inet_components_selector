import React, { useState } from 'react'
import { IUnit, FormatOptionLabelMeta } from '../../interfaces/interfaces'
import './UnitContainer.scss'

const units = [
  {
    id: '110000',
    nameCs: 'Lékařská fakulta',
    nameEn: 'Faculty of Medicine',
    shortCs: 'LF',
    shortEn: 'MED',
    color: '#f01928',
  },
  {
    id: '160000',
    nameCs: 'Farmaceutická fakulta',
    nameEn: 'Faculty of Pharmacy',
    shortCs: 'FaF',
    shortEn: 'PHARM',
    color: '#002776',
  },
  {
    id: '210000',
    nameCs: 'Filozofická fakulta',
    nameEn: 'Faculty of Arts',
    shortCs: 'FF',
    shortEn: 'SCI',
    color: '#4bc8ff',
  },
  {
    id: '220000',
    nameCs: 'Právnická fakulta',
    nameEn: ' Faculty of Law',
    shortCs: 'PrF',
    shortEn: 'LAW',
    color: '#814a0a',
  },
  {
    id: '230000',
    nameCs: 'Fakulta sociálních studií',
    nameEn: 'Faculty of Social Studies',
    shortCs: 'FSS',
    shortEn: 'FSS',
    color: '#008c78 ',
  },
  {
    id: '310000',
    nameCs: 'Přírodovědecká fakulta',
    nameEn: 'Faculty of Science',
    shortCs: 'PřF',
    shortEn: 'SCI',
    color: '#00af3f',
  },
  {
    id: '330000',
    nameCs: 'Fakulta informatiky',
    nameEn: 'Faculty of Informatics',
    shortCs: 'FI',
    shortEn: 'FI',
    color: '#f2d45c',
  },
  {
    id: '410000',
    nameCs: 'Pedagogická fakulta',
    nameEn: 'Faculty of Education',
    shortCs: 'PdF',
    shortEn: 'PED',
    color: '#ff7300',
  },
  {
    id: '510000',
    nameCs: 'Fakulta sportovních studií',
    nameEn: 'Faculty of Sports Studies',
    shortCs: 'FSpS',
    shortEn: 'FSpS',
    color: '#002776',
  },
  {
    id: '560000',
    nameCs: 'Ekonomicko-správní fakulta',
    nameEn: 'Faculty of Economics and Administration',
    shortCs: 'ESF',
    shortEn: 'ECON',
    color: '#b9006e',
  },
]
const UnitContainer = (unit: IUnit, meta: FormatOptionLabelMeta) => {
  return meta.context === 'menu' ? (
    <div className="unit-container-menu">
      <span>{unit.shortCs}</span>
      <span>&#160;-&#160;</span>
      <span>{unit.nameCs}</span>
    </div>
  ) : (
    <div className="unit-container-input">
      <span
        style={{
          height: '10px',
          width: '10px',
          borderRadius: '50%',
          display: 'inline-block',
          backgroundColor: unit.color,
        }}
      ></span>
      <span>&#160;&#160;</span>
      <span>{unit.nameCs}</span>
    </div>
  )
}
export default UnitContainer
