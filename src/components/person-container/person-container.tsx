import React from "react";
import "./person-container.scss";
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
        <span style={{ fontWeight: "bold" }}>{props.label}</span>
        <div>
          {props.status && props.status.zamestnanec.length > 0 ? (
            <span>
              Zaměstnanec: {props.status.zamestnanec.map((zam) => zam + " ")}
            </span>
          ) : (
            false
          )}

          {/* alternativne k ternarnimu vyrazu: */}
          {/* je to kratsi zapis bez ? a bez nutnosti psat variantu : */}
          {props.status && props.status.student.length > 0 && (
            <React.Fragment>
              <span>&#160;&#160;</span>
              <span>Student: {props.status.student.map((stud) => stud)}</span>
            </React.Fragment>
          )}
        </div>
        <span>Telefon: {props.phone}</span>
      </div>
    </div>
  ) : (
    props.label
  );
};
export default PersonContainer;
