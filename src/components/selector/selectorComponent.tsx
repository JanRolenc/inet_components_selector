import React, { useState, useEffect, ChangeEvent } from 'react'
import Select from 'react-select'
import { IPersons, ISelector } from '../../Interfaces/interfaces'
import './selectorComponent.scss'
import personContainer from '../personContainer/personContainer'

// interface State {
//   readonly isClearable: boolean
// }
function Selector({ required, disabled }: ISelector) {
  const [persons, setPersons] = useState<IPersons[]>([
    {
      value: 'jules verne',
      id: 1,
      label: 'Jules Verne',
      name: 'jules verne',
      phone: 111111111,
      status: { zamestnanec: ['ÚVT', 'ÚVT'], student: ['FI', 'FF'] },
    },
    {
      value: 'ota pavel',
      id: 2,
      label: 'Ota Pavel',
      name: 'ota pavel',
      phone: 222222222,
      status: { zamestnanec: ['MU', 'PřF'], student: [] },
    },
    {
      value: 'bohumil hrabal',
      id: 3,
      label: 'Bohumil Hrabal',
      name: 'bohumil hrabal',
      phone: 333333333,
      status: { zamestnanec: [], student: ['ESF'] },
    },
    {
      value: 'jan skácel',
      id: 4,
      label: 'Jan Skácel',
      name: 'jan skácel',
      phone: 444444444,
      status: { zamestnanec: ['MU', 'PrF'], student: [] },
    },
    {
      value: 'karel čapek',
      id: 5,
      label: 'Karel Čapek',
      name: 'karel čapek',
      phone: 555555555,
      status: { zamestnanec: ['MU', 'FF'], student: ['FF'] },
    },
    {
      value: 'arnošt lustig',
      id: 6,
      label: 'Arnošt Lustig',
      name: 'arnošt lustig',
      phone: 666666666,
      status: { zamestnanec: ['MU', 'FSS'], student: ['FSS'] },
    },
    {
      value: 'vladislav vančura',
      id: 7,
      label: 'Vladislav Vančura',
      name: 'vladislav vančura',
      phone: 777777777,
      status: { zamestnanec: ['MU', 'FI'], student: [] },
    },
    {
      value: 'karolina světlá',
      id: 8,
      label: 'Karolina Světlá',
      name: 'karolina světlá',
      phone: 888888888,
      status: { zamestnanec: ['MU', 'PdF'], student: [] },
    },
    {
      value: 'alena mornštajnová',
      id: 9,
      label: 'Alena Mornštajnová',
      name: 'alena mornštajnová',
      phone: 999999999,
      status: { zamestnanec: ['MU', 'FSpS'], student: [] },
    },
    {
      value: 'božena němcová',
      id: 10,
      label: 'Božena Němcová',
      name: 'božena němcová',
      phone: 111222333,
      status: { zamestnanec: ['CEITEC', 'CEITEC'], student: [] },
    },
  ])
  // const [persons, setPersons] = useState<IPersons[]>([]);
  const [isCheckedZam, setIsCheckedZam] = useState(true)
  const [isCheckedStu, setIsCheckedStu] = useState(true)
  const [storedOption, setStoredOption] = useState(null)
  const [options, setOptions] = useState<IPersons[]>(persons) //kdyz nezavedu prom options (filtruju a prenastavuju rovnou persons), tak filtrovani checkboxy nefunguje;

  // const getPersons = () => {
  //   fetch('data.json', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   })
  //     .then(function (response) {
  //       return response.json()
  //     })
  //     .then(function (persons) {
  //       setPersons(persons)
  //     })
  // }
  // useEffect(() => {
  //   getPersons()
  // }, [])

  const onCheckboxStuChange = () => {
    isCheckedZam && !isCheckedStu
      ? setOptions(persons)
      : isCheckedZam && isCheckedStu
      ? setOptions(persons.filter((p) => p.status.zamestnanec.length > 0))
      : !isCheckedZam && isCheckedStu
      ? setOptions(persons.filter((p) => p.status.student.length > 10))
      : setOptions(persons.filter((p) => p.status.student.length > 0))
    setIsCheckedStu(!isCheckedStu)
  }
  const onCheckboxZamChange = () => {
    !isCheckedZam && isCheckedStu
      ? setOptions(persons)
      : isCheckedZam && isCheckedStu
      ? setOptions(persons.filter((p) => p.status.student.length > 0))
      : isCheckedZam && !isCheckedStu
      ? setOptions(persons.filter((p) => p.status.zamestnanec.length > 10))
      : setOptions(persons.filter((p) => p.status.zamestnanec.length > 0))
    setIsCheckedZam(!isCheckedZam)
  }
  const handleChange = (selectedOption: any) => {
    setStoredOption(selectedOption)
    console.log(selectedOption)
    console.log(selectedOption.name)
    console.log(storedOption)
  }
  const personsStyles = {
    control: (styles: any) => ({
      ...styles,
      // backgroundColor: required ? '#fcf4e3 !important;' : undefined,
      // borderRadius: '3px',
      // padding: '0px 3px',
      minHeight: 'auto',
      zIndex: 'auto',
      width: '350px',
    }),
    // singleValue: (styles: any, { isFocused }: any) => ({
    //   ...styles,
    //   zIndex: '1',
    // }),
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
    IndicatorsContainer: (styles: any) => ({
      ...styles,
      zIndex: 10,
      backgroundColor: 'blue',
    }),
    // valueContainer: (styles: any) => ({
    //   ...styles,
    //   width: '200px',
    //   backgroundColor: 'red',
    // }),
  }
  return (
    <div className="selector-container">
      <div className="checkboxes-container">
        <input
          type="checkbox"
          id="zam"
          name="zam"
          value="Zaměstnanec"
          checked={isCheckedZam}
          onChange={onCheckboxZamChange}
        ></input>
        <label htmlFor="zam">
          Zaměstnanec<span></span>
        </label>
        <input
          type="checkbox"
          id="stud"
          name="stud"
          value="Student"
          checked={isCheckedStu}
          onChange={onCheckboxStuChange}
        ></input>
        <label htmlFor="stud">Student</label>
      </div>

      <Select
        // classNamePrefix="select"
        placeholder="Vyhledej..."
        options={options}
        formatOptionLabel={personContainer}
        getOptionValue={(option) => '' + option.id} //pomoci '' nemusime stringify
        isDisabled={disabled}
        isClearable={true}
        // menuIsOpen={true} //dropdown menu-list zustane rozevreny a da se lip zkoumat
        styles={personsStyles}
        onChange={handleChange}
      />
      {/* <p>Vybrane jmeno: {selectedOption}</p> */}
    </div>
  )
}

export default Selector
