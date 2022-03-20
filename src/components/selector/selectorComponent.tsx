import React, { useState, useEffect, ChangeEvent, Fragment } from 'react'
import Select, { components } from 'react-select'
import AsyncSelect from 'react-select/async'
import { IPerson, ISelector } from '../../interfaces/interfaces'
import './SelectorComponent.scss'
import PersonContainer from '../PersonContainer/PersonContainer'

function Selector({ required, disabled, name, selectedId }: ISelector) {
  const [persons, setPersons] = useState<IPerson[]>([
    {
      id: 1,
      name: 'Jules Verne',
      phone: 111111111,
      status: { zamestnanec: ['ÚVT', 'ÚVT'], student: ['FI', 'FF'] },
    },
    {
      id: 2,
      name: 'Ota Pavel',
      phone: 222222222,
      status: { zamestnanec: ['MU', 'PřF'], student: [] },
    },
    {
      id: 3,
      name: 'Bohumil Hrabal',
      phone: 333333333,
      status: { zamestnanec: [], student: ['ESF'] },
    },
    {
      id: 4,
      name: 'Jan Skácel',
      phone: 444444444,
      status: { zamestnanec: ['MU', 'PrF'], student: [] },
    },
    {
      id: 5,
      name: 'Karel Čapek',
      phone: 555555555,
      status: { zamestnanec: ['MU', 'FF'], student: ['FF'] },
    },
    {
      id: 6,
      name: 'Arnošt Lustig',
      phone: 666666666,
      status: { zamestnanec: ['MU', 'FSS'], student: ['FSS'] },
    },
    {
      id: 7,
      name: 'Vladislav Vančura',
      phone: 777777777,
      status: { zamestnanec: ['MU', 'FI'], student: [] },
    },
    {
      id: 8,
      name: 'Karolina Světlá',
      phone: 888888888,
      status: { zamestnanec: ['MU', 'PdF'], student: [] },
    },
    {
      id: 9,
      name: 'Alena Mornštajnová',
      phone: 999999999,
      status: { zamestnanec: ['MU', 'FSpS'], student: [] },
    },
    {
      id: 10,
      name: 'Božena Němcová',
      phone: 111222333,
      status: { zamestnanec: ['CEITEC', 'CEITEC'], student: [] },
    },
  ])
  // const [persons, setPersons] = useState<IPersons[]>([]);
  const [isCheckedZam, setIsCheckedZam] = useState(true)
  const [isCheckedStu, setIsCheckedStu] = useState(true)
  const [storedOption, setStoredOption] = useState<IPerson | null>(null)
  const [options, setOptions] = useState<IPerson[]>(persons) //kdyz nezavedu prom options (filtruju a prenastavuju rovnou persons), tak filtrovani checkboxy nefunguje;

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

  const handleChange = (selectedOption: any) => {
    setStoredOption(selectedOption)
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
    clearIndicator: (styles: any) => ({
      ...styles,
      padding: '3px',
    }),
  }

  const onCheckboxStuChange = () => {
    isCheckedZam && !isCheckedStu
      ? setOptions(persons)
      : isCheckedZam && isCheckedStu
      ? setOptions(persons.filter((p: any) => p.status.zamestnanec.length > 0))
      : !isCheckedZam && isCheckedStu
      ? setOptions(persons.filter((p: any) => p.status.student.length > 10))
      : setOptions(persons.filter((p: any) => p.status.student.length > 0))
    setIsCheckedStu(!isCheckedStu)
  }
  const onCheckboxZamChange = () => {
    !isCheckedZam && isCheckedStu
      ? setOptions(persons)
      : isCheckedZam && isCheckedStu
      ? setOptions(persons.filter((p: any) => p.status.student.length > 0))
      : isCheckedZam && !isCheckedStu
      ? setOptions(persons.filter((p: any) => p.status.zamestnanec.length > 10))
      : setOptions(persons.filter((p: any) => p.status.zamestnanec.length > 0))
    setIsCheckedZam(!isCheckedZam)
  }

  const filterPersons: any = (inputValue: string) => {
    return persons.filter((i) =>
      i.name.toLowerCase().includes(inputValue.toLowerCase()),
    )
  }
  const promiseOptions = (inputValue: string) =>
    new Promise<IPerson[]>((resolve) => {
      setTimeout(() => {
        resolve(filterPersons(inputValue))
      }, 1000)
    })

  const Menu = (props: any) => {
    return (
      <Fragment>
        <components.Menu {...props}>
          <div>{props.children}</div>
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
        </components.Menu>
      </Fragment>
    )
  }

  return (
    <div className="selector-container">
      <input
        type="hidden"
        name={name}
        value={storedOption ? storedOption.id : ''}
      />

      <AsyncSelect
        defaultValue={persons.filter((p) => p.id === selectedId)[0]} //proc je tady [0]?
        placeholder="Vyhledej..."
        loadOptions={promiseOptions}
        options={options}
        components={{ Menu }}
        formatOptionLabel={PersonContainer}
        getOptionValue={(option) => '' + option.id} //pomoci '' nemusime stringify
        isDisabled={disabled}
        isClearable={true}
        menuIsOpen={true} //dropdown menu-list zustane rozevreny a da se lip zkoumat
        styles={personsStyles}
        onChange={handleChange}
      />
    </div>
  )
}

export default Selector
