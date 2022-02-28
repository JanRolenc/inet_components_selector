import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { IPersons } from '../../Interfaces/interfaces'
import './selector-component.scss'
import PersonContainer from '../person-container/person-container'
import personsList from '../../docs/personsList.json'

function Selector() {
  const [persons, setPersons] = useState<IPersons[]>([
    {
      value: 'jules verne',
      id: 1,
      label: 'Jules Verne',
      name: 'osoba',
      phone: 111111111,
      status: { zamestnanec: [], student: ['FF'] },
    },
    {
      value: 'ota pavel',
      id: 2,
      label: 'Ota Pavel',
      name: 'osoba',
      phone: 222222222,
      status: { zamestnanec: ['MU', 'FF'], student: ['FI'] },
    },
    {
      value: 'bohumi hrabal',
      id: 3,
      label: 'Bohumil Hrabal',
      name: 'osoba',
      phone: 333333333,
      status: { zamestnanec: [], student: ['ESF'] },
    },
    {
      value: 'jan skácel',
      id: 4,
      label: 'Jan Skácel',
      name: 'osoba',
      phone: 444444444,
      status: { zamestnanec: [], student: ['ESF'] },
    },
    {
      value: 'Karel čapek',
      id: 5,
      label: 'Karel Čapek',
      name: 'osoba',
      phone: 555555555,
      status: { zamestnanec: [], student: ['FI', 'FF'] },
    },
    {
      value: 'arnošt lustig',
      id: 6,
      label: 'Arnošt Lustig',
      name: 'osoba',
      phone: 666666666,
      status: { zamestnanec: ['MU', 'FSS'], student: ['FSS'] },
    },
    {
      value: 'vladislav vančura',
      id: 7,
      label: 'Vladislav Vančura',
      name: 'osoba',
      phone: 777777777,
      status: { zamestnanec: ['MU', 'FI'], student: [] },
    },
    {
      value: 'karolina světlá',
      id: 8,
      label: 'Karolina Světlá',
      name: 'osoba',
      phone: 888888888,
      status: { zamestnanec: ['MU', 'PdF'], student: [] },
    },
    {
      value: 'alena mornštajnová',
      id: 9,
      label: 'Alena Mornštajnová',
      name: 'osoba',
      phone: 999999999,
      status: { zamestnanec: ['MU', 'FSpS'], student: [] },
    },
    {
      value: 'božena němcová',
      id: 10,
      label: 'Božena Němcová',
      name: 'osoba',
      phone: 111222333,
      status: { zamestnanec: ['CEITEC'], student: [] },
    },
  ])
  const [isCheckedZam, setIsCheckedZam] = useState(true)
  const [isCheckedStu, setIsCheckedStu] = useState(true)
  const [options, setOptions] = useState(persons)

  // useEffect(() => {
  //   fetch('')
  //     .then((response) => response.json())
  //     .then((persons) => {
  //       setPersons(persons)
  //     })
  // }, [])

  const onCheckboxStuChange = () => {
    if (isCheckedZam && !isCheckedStu) {
      setOptions(persons)
    } else if (isCheckedZam && isCheckedStu) {
      setOptions(persons.filter((p) => p.status.zamestnanec.length > 0))
    } else if (!isCheckedZam && isCheckedStu) {
      setOptions(persons.filter((p) => p.status.student.length > 10))
    } else {
      setOptions(persons.filter((p) => p.status.student.length > 0))
    }
    setIsCheckedStu(!isCheckedStu)
  }
  const onCheckboxZamChange = () => {
    if (!isCheckedZam && isCheckedStu) {
      setOptions(persons)
    } else if (isCheckedZam && isCheckedStu) {
      setOptions(persons.filter((p) => p.status.student.length > 0))
    } else if (isCheckedZam && !isCheckedStu) {
      setOptions(persons.filter((p) => p.status.zamestnanec.length > 10))
    } else {
      setOptions(persons.filter((p) => p.status.zamestnanec.length > 0))
    }
    setIsCheckedZam(!isCheckedZam)
  }

  return (
    <div style={{ width: '50vw', marginTop: '50px' }}>
      <div className="selector-container">
        <div className="checkboxes">
          <input
            type="checkbox"
            id="zam"
            name="zam"
            value="Zaměstnanec"
            checked={isCheckedZam}
            onClick={onCheckboxZamChange}
          ></input>
          <label htmlFor="zam">
            Zaměstnanec<span></span>
          </label>
          <input
            type="checkbox"
            id="stud"
            name="stud"
            value="Student"
            onClick={onCheckboxStuChange}
            checked={isCheckedStu}
          ></input>
          <label htmlFor="stud">Student</label>
        </div>
      </div>

      <Select
        placeholder="Vyhledej..."
        options={options}
        formatOptionLabel={PersonContainer}
      />
    </div>
  )
}

export default Selector
