import React, { Component } from 'react'
import AsyncSelect from 'react-select/async'
import UnitContainer from '../UnitContainer/UnitContainer'
import { units } from '../../docs/units'
import { IUnit } from '../../interfaces/interfaces'

const unitsStyles = {
  control: (styles: any) => ({
    ...styles,
    minHeight: 'auto',
    zIndex: 'auto',
    width: '350px',
  }),
  option: (styles: any, { isFocused }: any) => ({
    ...styles,
    backgroundColor: isFocused ? '#999' : undefined,
    color: isFocused ? 'white' : undefined,
    zIndex: 1,
  }),
  menu: (styles: any) => ({
    ...styles,
    color: '#555',
    zIndex: 100,
    width: '350px',
  }),
  //uzsi input
  dropdownIndicator: (styles: any) => ({
    ...styles,
    padding: '3px',
  }),
  clearIndicator: (styles: any) => ({
    ...styles,
    padding: '3px',
  }),
}
interface State {
  readonly inputValue: string
}
const filterUnits = (inputValue: string) => {
  console.log('filterUnits inputValue:', inputValue) //funguje
  return units.filter((i) =>
    i.nameCs.toLowerCase().includes(inputValue.toLowerCase()),
  )
}

const promiseOptions = (inputValue: string) =>
  new Promise<IUnit[]>((resolve) => {
    setTimeout(() => {
      resolve(filterUnits(inputValue))
    }, 1000)
  })

export default class CustomAsyncMultiSelect extends Component<{}, State> {
  state: State = { inputValue: '' }
  handleInputChange = (newValue: string) => {
    console.log('handleInputChange pred setState:', newValue) //nic nevyhazuje
    const inputValue = newValue.replace(/\W/g, '')
    console.log(
      'inputValue po stanoveni const inputValue = newValue.replace:',
      inputValue,
    )
    this.setState({ inputValue })
    console.log('handleInputChange po setState:', newValue) //nic nevyhazuje
    return inputValue
  }
  render() {
    return (
      <AsyncSelect
        isMulti
        closeMenuOnSelect={false}
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        formatOptionLabel={UnitContainer}
        styles={unitsStyles}
        onInputChange={this.handleInputChange}
        onChange={(input) => console.log('onChange:', input)}
      />
    )
  }
}
