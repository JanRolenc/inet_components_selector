import React from "react";
import { IPersons, FormatOptionLabelMeta } from "../../Interfaces/interfaces";
import personalImage from "../../pictures/icon_head.png";

const PersonContainer = (
  { ...props }: IPersons,
  formatpropsLabelMeta: FormatOptionLabelMeta
) => {
  return formatpropsLabelMeta.context === "menu" ? (
    <div className="person-container">
      <img src={personalImage} alt="icon" />
      <div className="person-details">
        <span style={{ fontWeight: "bold" }}>
          <a className="p-link">{props.label}</a>
        </span>
        <div>
          {props.status && props.status.zamestnanec.length > 0 ? (
            <span>
              Zaměstnanec: {props.status.zamestnanec.map((zam) => zam + " ")}
            </span>
          ) : (
            false
          )}
          {props.status && props.status.student.length > 0 && (
            <span>
              Student: {props.status.student.map((stud) => stud + " ")}
            </span>
          )}
        </div>
        <span>Telefon: {props.phone}</span>
      </div>
    </div>
  ) : (
    <a href={"/s/k/" + props.id} className="p-link">
      {props.label}
    </a>
  );
};
export default PersonContainer;
