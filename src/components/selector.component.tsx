import React, { Component, Fragment } from 'react';

import Select from 'react-select';
import { personsList } from '../docs/personsList';
import './selector.styles.scss';
import PersonContainer from './person-container/person-container.component';

// const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
//   <label style={{ marginRight: '1em' }}>
//     <input type="checkbox" {...props} />
//     {children}
//   </label>
// );


interface State {
  readonly isClearable: boolean;
  readonly isDisabled: boolean;
  readonly isLoading: boolean;
  readonly isRtl: boolean;
  readonly isSearchable: boolean;
}

export default class SingleSelect extends Component<{}, State> {
  state: State = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
  };

  toggleClearable = () =>
    this.setState((state) => ({ isClearable: !state.isClearable }));
  toggleDisabled = () =>
    this.setState((state) => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState((state) => ({ isLoading: !state.isLoading }));
  toggleRtl = () => this.setState((state) => ({ isRtl: !state.isRtl }));
  toggleSearchable = () =>
    this.setState((state) => ({ isSearchable: !state.isSearchable }));

  render() {
    const {
      toggleClearable,
      toggleDisabled,
      toggleLoading,
      toggleRtl,
      toggleSearchable,
    } = this;

    const { isClearable, isSearchable, isDisabled, isLoading, isRtl } =
      this.state;

    return (
      <Fragment>
        <Select
          className="basic-single"
          classNamePrefix="select"
          // defaultValue={colourOptions[0]}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="osoba"
          options={personsList}
          formatOptionLabel={PersonContainer}
            // (option, meta) => {

          //   return meta.context === "menu"?
          //     <div className="person-container">
          //       <img src={personalImage} alt="icon"/>                             
          //       <div className="person-details">
          //       {option.label}
          //       {/* { `${option.status}`} */}
          //       {/* {option.status.zamestnanec} */}
                
          //       {/* { `${option.status} ${option.status.zamestnanec} {<span>Zamestnanec { option.status.zamestnanec.map(r => r ) }</span>}` } */}
          //       { option.status && option.status.student && <span>Student { option.status.student.map(r => r) }</span> }
          //       </div>
          //     </div>
          //     :
          //     option.label
          // }}
          // formatOptionLabel={ (option, meta) => {
          //   return meta.context === "menu"?
          //     <PersonContainer />
          //     :
          //     option.name
          // }
        />

        <div
          style={{
            color: 'hsl(0, 0%, 40%)',
            display: 'inline-block',
            fontSize: 12,
            fontStyle: 'italic',
            marginTop: '1em',
          }}
        >
        </div>
      </Fragment>
    );
  }
}
