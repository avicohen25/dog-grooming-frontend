import React from "react";
import './Dropdown.scss';

const Dropdown = (props) => {

  //console.info('props.options', props.options);

  return (
    <div className="dropdown">

      <select value={props.value} onChange={props.onChange}>

        {props.placeholder && <option value=""> {props.placeholder} </option>}

        {
          props.options?.map((item, index) => (
            <option key={index} value={item?.key}> {item?.value} </option>
          ))
        }

      </select>

    </div>
  );
};

export default Dropdown;
