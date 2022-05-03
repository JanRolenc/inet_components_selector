import { useState, useRef } from 'react'
import Select, { InputActionMeta, components } from 'react-select'
import {
  IPerson,
  IPersonsSelect,
  IUnit,
  OptionsMode,
} from './interfaces/interfaces'
import './PersonsSelect.scss'
import PersonContainer from './PersonContainer'
import UnitsFilterCustom from './UnitsFilterCustom'
import './UnitsFilterCustom.scss'

import yellowStar from './pictures/yellow_star.png'
import blackStar from './pictures/black_star.png'

import { personsList } from './docs/personsList'

export default function PersonsSelect({
  required,
  disabled,
  name,
  selectAll,
  selectedId,
  myId,
}: IPersonsSelect) {
  const [persons, setPersons] = useState<IPerson[]>(personsList)
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
  const [isCheckedNezar, setIsCheckedNezar] = useState(selectAll)

  const [unitsSelected, setUnitsSelected] = useState<IUnit[]>([])

  const [menuIsOpen, setMenuIsOpen] = useState<boolean | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
    nezar: boolean,
    unitsSel: IUnit[],
  ): IPerson[] => {
    return persons.filter(
      (i) =>
        i.name.toLowerCase().includes(srchValPer.toLowerCase()) &&
        (unitsSel.length === 0 ||
          unitsSel.some((u) => i.unit.includes(u.shortCs))) &&
        ((!zam && !stud && !nezar) ||
          (zam && i.status.zamestnanec.length > 0) ||
          (stud && i.status.student.length > 0) ||
          (nezar && i.unit.length === 0)),
    )
  }

  const searchPersonsAsync = (
    srchValPer: string,
    zam: boolean,
    stud: boolean,
    nezar: boolean,
    unitsSel: IUnit[],
  ) => {
    if (!srchValPer && srchValPer.length < 1) {
      setOptionsMode(OptionsMode.FAVOURITE)
      setOptionsPersons(persons.filter((p) => p.favourite === true))
    } else {
      setIsLoading(true)
      setOptionsMode(OptionsMode.SEARCH)
      new Promise<IPerson[]>((resolve) => {
        setTimeout(
          () => resolve(filterPersons(srchValPer, zam, stud, nezar, unitsSel)),
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
    searchPersonsAsync(
      searchValue,
      isCheckedZam,
      newIsChecked,
      isCheckedNezar,
      unitsSelected,
    )
  }
  const onCheckboxZamChange = () => {
    const newIsChecked = !isCheckedZam
    setIsCheckedZam(newIsChecked)
    searchPersonsAsync(
      searchValue,
      newIsChecked,
      isCheckedStud,
      isCheckedNezar,
      unitsSelected,
    )
  }
  const onCheckboxNezarChange = () => {
    const newIsChecked = !isCheckedNezar
    setIsCheckedNezar(newIsChecked)
    searchPersonsAsync(
      searchValue,
      isCheckedZam,
      isCheckedStud,
      newIsChecked,
      unitsSelected,
    )
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
        <div className=" css-42oyae-indicatorContainer" aria-hidden="true">
          {selectedPerson && (
            <img
              className="yellowstar yellowstar--personinput"
              src={selectedPerson.favourite ? yellowStar : blackStar}
              alt="star"
              onClick={personsInputStarClick}
            />
          )}
        </div>
        <span className=" css-1okebmr-indicatorSeparator"></span>
        {props.children}
      </components.IndicatorsContainer>
    )
  }
  const selectRef = useRef<any>(null)
  const meSelection = () => {
    setSelectedPerson(persons.filter((p) => p.id === myId)[0])
    setOptionsMode(OptionsMode.ME)
    selectRef.current?.blur()
  }

  const Menu = (props: any) => {
    return (
      <components.Menu {...props}>
        <div className="menu-buttons">
          <div className="menu-buttons__button">
            <button onClick={meSelection}>Vyber mě</button>
          </div>

          <div className="menu-buttons__checkboxes">
            <input
              type="checkbox"
              id="zam"
              name="zam"
              checked={isCheckedZam}
              onChange={onCheckboxZamChange}
            ></input>
            <label htmlFor="zam">Zaměstnanec</label>
            <input
              type="checkbox"
              id="stud"
              name="stud"
              checked={isCheckedStud}
              onChange={onCheckboxStudChange}
            ></input>
            <label htmlFor="stud">Student</label>
            {selectAll ? (
              <div className="menu-buttons__checkboxes__nezar">
                <input
                  type="checkbox"
                  id="nazar"
                  name="nezar"
                  checked={isCheckedNezar}
                  onChange={onCheckboxNezarChange}
                ></input>
                <label htmlFor="stud">Nezařazení</label>
              </div>
            ) : null}
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
              isCheckedNezar,
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
  const getDefaultValue = () => {} //TADY POKRACUJ
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
        value={selectedPerson}
        placeholder="Vyhledej osobu (alespoň 2 písmena) ..."
        components={{ Menu, IndicatorsContainer }}
        options={optionsPersons}
        getOptionValue={(option) => '' + option.id} //pomoci '' nemusime stringify
        formatOptionLabel={PersonContainer}
        // getOptionLabel={option => }
        isDisabled={disabled}
        isSearchable={true}
        isClearable={true}
        // menuIsOpen={menuIsOpen}
        menuIsOpen={true}
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
              isCheckedNezar,
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
            isCheckedNezar,
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
