import React from 'react'
import { IPerson, FormatOptionLabelMeta } from '../../interfaces/interfaces'
import personalImage from '../../pictures/icon_head.png'
import './PersonContainer.css'

const PersonContainer = (person: IPerson, meta: FormatOptionLabelMeta) => {
  //----------podbarveni casti v person.name, ktera se shoduje s vyrazem vlozenym do inputu
  var label
  if (meta.inputValue) {
    const zadanyVyraz: RegExp = new RegExp(meta.inputValue, 'gi')
    const shodnyVyraz: RegExpExecArray | null = zadanyVyraz.exec(person.name)
    label = shodnyVyraz ? (
      <span>
        {person.name.substring(0, shodnyVyraz.index)}
        <span style={{ color: 'red' }}>
          {person.name.substring(
            shodnyVyraz.index,
            shodnyVyraz.index + meta.inputValue.length,
          )}
        </span>
        {person.name.substring(shodnyVyraz.index + meta.inputValue.length)}
      </span>
    ) : (
      //---------------------------------------------------------------------------------------------
      person.name
    )
  } else {
    label = person.name
  }

  return meta.context === 'menu' ? (
    <div className="person-container">
      <img src={personalImage} alt="icon" loading="lazy" />
      <div className="person-details">
        <span style={{ fontWeight: 'bold' }}>{label}</span>
        <div>
          {person.status && person.status.zamestnanec.length > 0 ? (
            <span>
              Zaměstnanec: {person.status.zamestnanec.map((zam) => zam + ' ')}
            </span>
          ) : (
            false
          )}
          {person.status && person.status.student.length > 0 && (
            <span>
              Student: {person.status.student.map((stud) => stud + ' ')}
            </span>
          )}
        </div>
        <span>Telefon: {person.phone}</span>
      </div>
    </div>
  ) : (
    <a href={'/s/k/' + person.id} className="p-link">
      {/* <div className="hover-item">{person.name}</div> */}
      {person.name}
    </a>
  )
}
export default PersonContainer
