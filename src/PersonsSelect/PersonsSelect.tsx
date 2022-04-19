import React, { useState, useRef } from 'react'
import Select, {
  InputActionMeta,
  components,
  IndicatorSeparatorProps,
} from 'react-select'
import {
  IPerson,
  IPersonsSelect,
  IUnit,
  OptionsMode,
} from './interfaces/interfaces'
import './PersonsSelect.scss'
import PersonContainer from './PersonContainer'
import UnitsFilter from './UnitsFilter'
import UnitsFilterCustom from './UnitsFilterCustom'
import './UnitsFilterCustom.scss'

import yellowStar from './pictures/yellow_star.png'
import blackStar from './pictures/black_star.png'

export default function PersonsSelect({
  required,
  disabled,
  name,
  selectedId,
  myId,
}: IPersonsSelect) {
  const [persons, setPersons] = useState<IPerson[]>([
    {
      id: 1,
      name: 'Jules Verne',
      phone: 111111111,
      status: { zamestnanec: ['ÚVT'], student: ['FI', 'FF'] },
      unit: ['ÚVT', 'FI', 'FF'],
      favourite: true,
      myId: 100,
    },
    {
      id: 2,
      name: 'Ota Pavel',
      phone: 222222222,
      status: { zamestnanec: ['PřF'], student: [] },
      unit: ['PřF'],
      favourite: true,
      myId: 200,
    },
    {
      id: 3,
      name: 'Bohumil Hrabal',
      phone: 333333333,
      status: { zamestnanec: [], student: ['ESF'] },
      unit: ['ESF'],
      favourite: true,
      myId: 300,
    },
    {
      id: 4,
      name: 'Jan Skácel',
      phone: 444444444,
      status: { zamestnanec: ['PrF'], student: [] },
      unit: ['PrF'],
      favourite: false,
      myId: 400,
    },
    {
      id: 5,
      name: 'Karel Čapek',
      phone: 555555555,
      status: { zamestnanec: ['FF'], student: ['FF'] },
      unit: ['FF'],
      favourite: false,
      myId: 500,
    },
    {
      id: 6,
      name: 'Arnošt Lustig',
      phone: 666666666,
      status: { zamestnanec: ['FSS'], student: ['FSS'] },
      unit: ['FSS'],
      favourite: false,
      myId: 600,
    },
    {
      id: 7,
      name: 'Vladislav Vančura',
      phone: 777777777,
      status: { zamestnanec: ['FI'], student: [] },
      unit: ['FI'],
      favourite: false,
      myId: 700,
    },
    {
      id: 8,
      name: 'Karolina Světlá',
      phone: 888888888,
      status: { zamestnanec: ['PdF'], student: [] },
      unit: ['PdF'],
      favourite: false,
      myId: 800,
    },
    {
      id: 9,
      name: 'Alena Mornštajnová',
      phone: 999999999,
      status: { zamestnanec: ['FSpS'], student: [] },
      unit: ['FSpS'],
      favourite: false,
      myId: 900,
    },
    {
      id: 10,
      name: 'Božena Němcová',
      phone: 111222333,
      status: { zamestnanec: ['CEITEC'], student: [] },
      unit: ['CEITEC'],
      favourite: false,
      myId: 1000,
    },
    {
      id: 11,
      name: 'Ani student, ani zamestnanec',
      phone: 0,
      status: { zamestnanec: [], student: [], zadnyVztah: 'lobbista' },
      unit: [],
      favourite: false,
      myId: 1100,
    },
    {
      id: 12,
      name: 'Zdeněk Machač',
      phone: 22222111,
      status: { zamestnanec: ['ÚVT'], student: [] },
      unit: ['FI'],
      favourite: true,
      myId: 1200,
    },
  ])

  const [optionsPersons, setOptionsPersons] = useState<IPerson[]>([])
  const [selectedPerson, setSelectedPerson] = useState<IPerson | null>(
    persons.filter((p) => p.id === selectedId)[0],
  )
  const [optionsMode, setOptionsMode] = useState<OptionsMode>(
    OptionsMode.FAVOURITE,
  )
  const [searchValue, setSearchValue] = useState<string>('')
  const [isCheckedZam, setIsCheckedZam] = useState(true)
  const [isCheckedStud, setIsCheckedStud] = useState(true)

  const [unitsSelected, setUnitsSelected] = useState<IUnit[]>([])

  const [menuIsOpen, setMenuIsOpen] = useState<boolean | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [toggledStar, setToggledStar] = useState<boolean>()

  // const handleChange = (person: IPerson | null) => {
  //   setSelectedValuePerson(person);
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
      //zajisti uzsi cely input
      // zIndex: "auto",//???
      // width: "350px",//sirka je upravena v nadrazenem persons-select-container
    }),
    indicatorsContainer: (styles: any) => ({
      ...styles,
      display: 'flex',
      flexDirection: 'row',
    }),
    option: (styles: any, { isFocused }: any) => ({
      ...styles,
      backgroundColor: isFocused ? '#999' : undefined,
      color: isFocused ? 'white' : undefined,
      zIndex: 1,
    }),
    //mohlo by se asi zrusit
    // menu: (styles: any) => ({
    //   ...styles,
    //   color: "#555",
    //   zIndex: 100,
    //   width: "350px",
    // }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      padding: '3px', //zajisti uzsi cely input
    }),
    clearIndicator: (styles: any) => ({
      ...styles,
      padding: '3px', //zajisti uzsi cely input
    }),
  }

  const selectRef = useRef<any>(null)

  const filterPersons = (
    srchValPer: string,
    zam: boolean,
    stud: boolean,
    unitsSel: IUnit[],
  ): IPerson[] => {
    return persons.filter(
      (i) =>
        i.name.toLowerCase().includes(srchValPer.toLowerCase()) &&
        (unitsSel.length === 0 ||
          unitsSel.some((u) => i.unit.includes(u.shortCs))) &&
        ((!zam && !stud) ||
          (zam && i.status.zamestnanec.length > 0) ||
          (stud && i.status.student.length > 0)),
    )
  }

  const searchPersonsAsync = (
    srchValPer: string,
    zam: boolean,
    stud: boolean,
    unitsSel: IUnit[],
  ) => {
    if (!srchValPer && srchValPer.length < 1) {
      //tady pozdeji nastavime <2
      // setOptionsPersons([]);
      setOptionsMode(OptionsMode.FAVOURITE)
      setOptionsPersons(persons.filter((p) => p.favourite === true))
    } else {
      setIsLoading(true)
      setOptionsMode(OptionsMode.SEARCH)
      new Promise<IPerson[]>((resolve) => {
        setTimeout(
          () => resolve(filterPersons(srchValPer, zam, stud, unitsSel)),
          500,
        )
      })
        .then((loadedPersons) => {
          setOptionsPersons(loadedPersons)
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => setIsLoading(false))
    }
  }

  const onCheckboxStudChange = () => {
    const newIsChecked = !isCheckedStud
    setIsCheckedStud(newIsChecked)
    searchPersonsAsync(searchValue, isCheckedZam, newIsChecked, unitsSelected)
  }
  const onCheckboxZamChange = () => {
    const newIsChecked = !isCheckedZam
    setIsCheckedZam(newIsChecked)
    searchPersonsAsync(searchValue, newIsChecked, isCheckedStud, unitsSelected)
  }

  const personsInputStarClick = () => {
    if (selectedPerson) {
      const newPersons = persons.map((p) => {
        if (p.id === selectedPerson.id) {
          const newP = { ...p, favourite: !p.favourite }
          setSelectedPerson(newP)
          return newP
        }
        return p
      })
      setPersons(newPersons)
    }
  }

  const IndicatorsContainer = (props: any) => {
    return (
      <components.IndicatorsContainer {...props}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {selectedPerson && (
            <img
              style={{
                height: '13px',
                margin: 'auto 8px auto auto',
                opacity: '0.5',
              }}
              src={selectedPerson.favourite ? yellowStar : blackStar}
              alt="star"
              onClick={personsInputStarClick}
            />
          )}
          <span className=" css-1okebmr-indicatorSeparator"></span>
          {props.children}
        </div>
      </components.IndicatorsContainer>
    )
  }
  const meSelection = () => {
    //setOptionsPersons(persons.filter((p) => p.myId === myId));
    setSelectedPerson(persons.filter((p) => p.myId === myId)[0])
    // console.log(selectedPerson);
    setOptionsMode(OptionsMode.ME)
    //    setMenuIsOpen(false);
    selectRef.current?.blur()
  }
  // const handleChangeUnit = (event: string) => {
  //   setUnitValue(event.target.value);
  // };
  const Menu = (props: any) => {
    return (
      <components.Menu {...props}>
        <div className="menu-buttons-container">
          <button onClick={meSelection}>Vyber sám sebe</button>
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
              checked={isCheckedStud}
              onChange={onCheckboxStudChange}
            ></input>
            <label htmlFor="stud">Student</label>
          </div>
        </div>
        <UnitsFilterCustom
          unitsSelected={unitsSelected}
          setUnitsSelected={(unitsSel: IUnit[]) => {
            setUnitsSelected(unitsSel)
            searchPersonsAsync(
              searchValue,
              isCheckedZam,
              isCheckedStud,
              unitsSel,
            )
          }}
        />
        {/* <UnitsFilter
          unitsSelected={unitsSelected}
          setUnitsSelected={(unitsSel: IUnit[]) => {
            setUnitsSelected(unitsSel);
            searchPersonsAsync(
              searchValue,
              isCheckedZam,
              isCheckedStud,
              unitsSel
            );
          }} */}
        {/* setParentMenuOpen={setMenuIsOpen}
        /> */}

        {
          optionsMode === OptionsMode.FAVOURITE ? (
            <div style={{ margin: '10px auto 5px 10px' }}>Oblíbené osoby:</div>
          ) : optionsMode === OptionsMode.SEARCH ? (
            <div style={{ margin: '10px auto 5px 10px' }}>Nalezené osoby:</div>
          ) : null // OptionsMode.ME
        }
        <div>{props.children}</div>
      </components.Menu>
    )
  }
  const getDefaultValue = () => {}
  return (
    <div
      className="persons-select-container"
      onBlur={(e) => e.stopPropagation()}
    >
      <input
        type="hidden"
        name={name}
        value={selectedPerson ? selectedPerson.id : ''}
      />{' '}
      <Select
        ref={selectRef}
        value={selectedPerson} //proc je tady [0]? - protoze filter vraci pro kazde (p) pole, i kdyz je v nem jen jeden objekt a my chceme jen objekt
        placeholder="Vyhledej osobu (alespoň 2 písmena) ..."
        components={{ Menu, IndicatorsContainer }}
        options={optionsPersons}
        getOptionValue={(option) => '' + option.id} //pomoci '' nemusime stringify
        formatOptionLabel={PersonContainer}
        // getOptionLabel={option => }
        isDisabled={disabled}
        isSearchable={true}
        isClearable={true}
        menuIsOpen={menuIsOpen}
        // menuIsOpen={true}
        styles={personsStyles}
        onChange={(person) => setSelectedPerson(person)}
        inputValue={searchValue}
        onInputChange={(newValue: string, action: InputActionMeta) => {
          if (
            action.action !== 'input-blur' &&
            action.action !== 'menu-close'
          ) {
            setSearchValue(newValue)
            searchPersonsAsync(
              newValue,
              isCheckedZam,
              isCheckedStud,
              unitsSelected,
            )
          }
        }}
        onFocus={() => {
          //spusti filterPersons
          searchPersonsAsync(
            searchValue,
            isCheckedZam,
            isCheckedStud,
            unitsSelected,
          )
          //          setMenuIsOpen(true);
        }}
        filterOption={() => true} // filtrovano v async funkci
        isLoading={isLoading} //featura loading... zobrazi se v menu
      />
    </div>
  )
}
