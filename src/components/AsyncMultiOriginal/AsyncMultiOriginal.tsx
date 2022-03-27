// import React from "react";
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import AsyncSelect from 'react-select/async'
import { IPerson, FormatOptionLabelMeta } from '../../interfaces/interfaces'

export interface ColourOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}
export interface IUnit {
  readonly id: string
  readonly label: string
  readonly nameEn: string
  readonly shortCs: string
  readonly shortEn: string
  readonly color: string
}

const colourOptions: readonly ColourOption[] = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
]
const units: readonly IUnit[] = [
  {
    id: '110000',
    label: 'Lékařská fakulta',
    nameEn: 'Faculty of Medicine',
    shortCs: 'LF',
    shortEn: 'MED',
    color: '#f01928',
  },
  {
    id: '160000',
    label: 'Farmaceutická fakulta',
    nameEn: 'Faculty of Pharmacy',
    shortCs: 'FaF',
    shortEn: 'PHARM',
    color: '#002776',
  },
  {
    id: '210000',
    label: 'Filozofická fakulta',
    nameEn: 'Faculty of Arts',
    shortCs: 'FF',
    shortEn: 'SCI',
    color: '#4bc8ff',
  },
]

const formatOptionLabel = ({ label, shortCs }: any) => (
  <div style={{ display: 'flex' }}>
    <div>{label}</div>
    <div style={{ marginLeft: '10px', color: '#ccc' }}>{shortCs}</div>
  </div>
)

interface State {
  readonly inputValue: string
}

const filterColors = (inputValue: string) => {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase()),
  )
}

const promiseOptions = (inputValue: string) =>
  new Promise<ColourOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue))
    }, 1000)
  })

class CustomControl extends Component<{}, State> {
  state: State = { inputValue: '' }
  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '')
    this.setState({ inputValue })
    return inputValue
  }
  render() {
    return (
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions={colourOptions}
        loadOptions={promiseOptions}
      />
    )
  }
}
export default CustomControl
