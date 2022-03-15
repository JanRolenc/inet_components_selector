import React from "react";
import { IPerson, FormatOptionLabelMeta } from "../../Interfaces/interfaces";
import personalImage from "../../pictures/icon_head.png";
import "./personContainer.css";

const PersonContainer = (person: IPerson, meta: FormatOptionLabelMeta) => {
  var label;
  if (meta.inputValue) {
    const regex: RegExp = RegExp(meta.inputValue, "gi");
    const arr: RegExpExecArray | null = regex.exec(person.name);
    label = arr ? (
      <span>
        {person.name.substring(0, arr.index)}
        <span style={{ color: "red" }}>
          {person.name.substring(arr.index, arr.index + meta.inputValue.length)}
        </span>
        {person.name.substring(arr.index + meta.inputValue.length)}
      </span>
    ) : (
      person.name
    );
  } else {
    label = person.name;
  }

  return meta.context === "menu" ? (
    <div className="person-container">
      <img src={personalImage} alt="icon" loading="lazy" />
      <div className="person-details">
        <span style={{ fontWeight: "bold" }}>{label}</span>
        <div>
          {person.status && person.status.zamestnanec.length > 0 ? (
            <span>
              Zaměstnanec: {person.status.zamestnanec.map((zam) => zam + " ")}
            </span>
          ) : (
            false
          )}
          {person.status && person.status.student.length > 0 && (
            <span>
              Student: {person.status.student.map((stud) => stud + " ")}
            </span>
          )}
        </div>
        <span>Telefon: {person.phone}</span>
      </div>
    </div>
  ) : (
    <a href={"/s/k/" + person.id} className="p-link" style={{ color: "black" }}>
      <div className="hover-item">{person.name}</div>
    </a>
    // <a href={'/s/k/' + props.id}>{props.label}</a>
  );
};
export default PersonContainer;
