import React, { useState, useEffect, ChangeEvent } from 'react'
import Select, { ActionMeta, components } from 'react-select'
import AsyncSelect from 'react-select/async'
import { IPerson, ISelector, IUnit } from '../../interfaces/interfaces'
import './SelectorComponent.scss'
import PersonContainer from '../PersonContainer/PersonContainer'
import CustomAsyncMultiSelect from '../CustomAsyncMultiSelect/CustomAsyncMultiSelect'
// import AsyncMultiOriginal from '../AsyncMultiOriginal/AsyncMultiOriginal'
import CustomControl from '../AsyncMultiOriginal/AsyncMultiOriginal'

function Selector({ required, disabled, name, selectedId }: ISelector) {
  const [persons, setPersons] = useState<IPerson[]>([
    {
      id: 1,
      name: 'Jules Verne',
      phone: 111111111,
      status: { zamestnanec: ['ÚVT', 'ÚVT'], student: ['FI', 'FF'] },
      fakulta: ['FI'],
    },
    {
      id: 2,
      name: 'Ota Pavel',
      phone: 222222222,
      status: { zamestnanec: ['MU', 'PřF'], student: [] },
      fakulta: ['PrF', 'LF'],
    },
    {
      id: 3,
      name: 'Bohumil Hrabal',
      phone: 333333333,
      status: { zamestnanec: [], student: ['ESF'] },
      fakulta: ['PřF'],
    },
    {
      id: 4,
      name: 'Jan Skácel',
      phone: 444444444,
      status: { zamestnanec: ['MU', 'PrF'], student: [] },
      fakulta: ['FSS', 'FF'],
    },
    {
      id: 5,
      name: 'Karel Čapek',
      phone: 555555555,
      status: { zamestnanec: ['MU', 'FF'], student: ['FF'] },
      fakulta: ['FI', 'FSS'],
    },
    {
      id: 6,
      name: 'Arnošt Lustig',
      phone: 666666666,
      status: { zamestnanec: ['MU', 'FSS'], student: ['FSS'] },
      fakulta: ['FI', 'PdF'],
    },
    {
      id: 7,
      name: 'Vladislav Vančura',
      phone: 777777777,
      status: { zamestnanec: ['MU', 'FI'], student: [] },
      fakulta: ['FI', 'FF'],
    },
    {
      id: 8,
      name: 'Karolina Světlá',
      phone: 888888888,
      status: { zamestnanec: ['MU', 'PdF'], student: [] },
      fakulta: ['PdF', 'PřF'],
    },
    {
      id: 9,
      name: 'Alena Mornštajnová',
      phone: 999999999,
      status: { zamestnanec: ['MU', 'FSpS'], student: [] },
      fakulta: ['FSpS', 'FSS'],
    },
    {
      id: 10,
      name: 'Božena Němcová',
      phone: 111222333,
      status: { zamestnanec: ['CEITEC', 'CEITEC'], student: [] },
      fakulta: ['FaF', 'PrF'],
    },
    {
      id: 11,
      name: 'Ani student, ani zamestnanec',
      phone: 0,
      status: { zamestnanec: [], student: [], zadnyVztah: 'lobbista' },
      fakulta: [],
    },
  ])
  const [units, setUnits] = useState<IUnit[]>([
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
  ])
  const [isCheckedZam, setIsCheckedZam] = useState(true)
  const [isCheckedStu, setIsCheckedStu] = useState(true)
  const [searchValuePersons, setSearchValuePersons] = useState<string>('')
  const [searchValueUnits, setSearchValueUnits] = useState<string[]>([])
  const [optionsPersons, setOptionsPersons] = useState<IPerson[]>([])
  const [optionsUnits, setOptionsUnits] = useState<IUnit[]>(units)
  const [selectedValue, setSelectedValue] = useState<IPerson | null>(null)
  const [selectedValueUnit, setSelectedValueUnit] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // const handleChange = (person: IPerson | null) => {
  //   setSelectedValue(person);
  // };

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

  const personsStyles = {
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

  const filterPersons = (
    srchValPer: string,
    zam: boolean,
    stud: boolean,
    srchValUnit: string[],
  ): IPerson[] => {
    return persons.filter(
      (i) =>
        i.name.toLowerCase().includes(srchValPer.toLowerCase()) &&
        ((!zam && !stud) ||
          (zam && i.status.zamestnanec.length > 0) ||
          (stud && i.status.student.length > 0)),
    )
  }
  const searchPersonsAsync = (
    srchValPer: string,
    zam: boolean,
    stud: boolean,
    srchValUnit: string[],
  ) => {
    if (!srchValPer && srchValPer.length < 1) {
      //tady pozdeji nastavime <2
      setOptionsPersons([])
    } else {
      setIsLoading(true)
      new Promise<IPerson[]>((resolve) => {
        setTimeout(
          () => resolve(filterPersons(srchValPer, zam, stud, srchValUnit)),
          500,
        )
      })
        .then((loadedPersons) => {
          // console.log("LOD ", loadedPersons);
          setOptionsPersons(loadedPersons)
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => setIsLoading(false))
    }
  }
  interface State {
    readonly inputValue: string
  }

  // const searchUnitsAsync = (srchVal: string) => {
  //   if (!srchVal && srchVal.length < 1) {
  //     //tady pozdeji nastavime <2
  //     setOptionsUnits([])
  //   } else {
  //     setIsLoading(true)
  //     new Promise<IUnit[]>((resolve) => {
  //       setTimeout(() => resolve(filterUnits(srchVal)), 500)
  //     })
  //       .then((loadedUnits) => {
  //         setOptionsUnits(loadedUnits)
  //       })
  //       .catch((error) => {
  //         console.error(error)
  //       })
  //       .finally(() => setIsLoading(false))
  //   }
  // }

  const onCheckboxStuChange = () => {
    const newIsChecked = !isCheckedStu
    setIsCheckedStu(newIsChecked)
    searchPersonsAsync(
      searchValuePersons,
      isCheckedZam,
      newIsChecked,
      searchValueUnits,
    )
  }
  const onCheckboxZamChange = () => {
    const newIsChecked = !isCheckedZam
    setIsCheckedZam(newIsChecked)
    searchPersonsAsync(
      searchValuePersons,
      newIsChecked,
      isCheckedStu,
      searchValueUnits,
    )
  }
  const Menu = (props: any) => {
    return (
      <components.Menu {...props}>
        <div className="checkboxes-container">
          <input
            type="checkbox"
            id="zam"
            name="zam"
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
            checked={isCheckedStu}
            onChange={onCheckboxStuChange}
          ></input>
          <label htmlFor="stud">Student</label>
        </div>
        {/* <AsyncSelect
          placeholder="Fakulta..."
          // isSearchable={true}
          isClearable={true}
          cacheOptions
          isMulti
          formatOptionLabel={UnitContainer}
          // loadOptions={searchUnitsAsync}
          defaultOptions={optionsUnits}
          // filterOption={() => true}
          styles={unitsStyles}
          onChange={(newValue: any) => {
            setSearchValueUnits(newValue)
            searchUnitsAsync(newValue)
            console.log(newValue)
          }}
        /> */}

        <div>{props.children}</div>
      </components.Menu>
    )
  }
  return (
    <div className="selector-container">
      <input
        type="hidden"
        name={name}
        value={selectedValue ? selectedValue.id : ''}
      />
      <Select
        defaultValue={persons.filter((p) => p.id === selectedId)[0]} //proc je tady [0]? - protoze filter vraci pro kazde (p) pole, i kdyz je v nem jen jeden objekt a my chceme jen objekt
        placeholder="Vyhledej osobu (alespoň 2 písmena) ..."
        components={{ Menu }}
        options={optionsPersons}
        getOptionValue={(option) => '' + option.id} //pomoci '' nemusime stringify
        formatOptionLabel={PersonContainer}
        isDisabled={disabled}
        isSearchable={true}
        isClearable={true}
        // menuIsOpen={true}
        styles={personsStyles}
        //  onChange={handleChange}
        onInputChange={(newValue: string) => {
          setSearchValuePersons(newValue)
          searchPersonsAsync(
            newValue,
            isCheckedZam,
            isCheckedStu,
            searchValueUnits,
          )
        }}
        onFocus={() =>
          //spusti filterPersons
          searchPersonsAsync(
            searchValuePersons,
            isCheckedZam,
            isCheckedStu,
            searchValueUnits,
          )
        }
        filterOption={() => true} // filtrovano v async funkci
        isLoading={isLoading} //featura loading... zobrazi se v menu
      />
      <CustomAsyncMultiSelect />
      {/* <AsyncMultiOriginal /> */}
      <CustomControl />
    </div>
  )
}

export default Selector
