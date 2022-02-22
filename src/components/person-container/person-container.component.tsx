import React from "react";
import "./person-container.styles.css";
// import { personsList } from "../../docs/personsList";
import { IPersons } from "../../Interfaces/interfaces";
import personalImage from "../../pictures/icon_head.png";

// const PersonContainer = ({ ...props } : IPersons) => {
//   <div className="person-container">
//     <img src={personalImage} alt="icon" />
//     <div className="person-details">
//       {props.name}
//       {props.status && props.status.zamestnanec && (
//         <span>Zam. {props.status.zamestnanec.map((r) => r)}</span>
//       )}
//       {props.status && props.status.student && (
//         <span>Stud. {props.status.student.map((r) => r)}</span>
//       )}
//     </div>
//   </div>;
// };
const PersonContainer = ({ ...props }: IPersons) => (
  <div className="person-container">
    <img src={personalImage} alt="icon" />
    <div className="person-details">
      <span style={{ fontWeight: 'bold' }}>{props.label}</span>
      <div className="person-details-status">
      {
        (props.status && props.status.zamestnanec.length)?
        (
          <span>Zaměstnanec: {props.status.zamestnanec.map((zam) => zam + " ")}</span>
        )
        :
        (
          <span></span>
        )
      }
      {
        (props.status && props.status.student.length)?
        (
          <span>Student: {props.status.student.map((stud) => stud + " ")}</span>
        )
        :
        (
          <span></span>
        )
      }
      </div>
      <span>Telefon: {props.phone}</span>
    </div>
  </div>
);
export default PersonContainer;
