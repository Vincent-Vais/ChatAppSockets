import React, { useState } from "react";

import forms from "../../styles/forms";

const {
  FormGroup,
  Select,
  SelectHeader,
  SelectName,
  SelectIcon,
  SelectBody,
  Option,
} = forms;

const Dropdown = ({ options, current, handleChange, type }) => {
  const [extend, setExtend] = useState(false);

  const handleOptionClick = (idx) => {
    console.log(idx);
    setExtend(false);
    handleChange(idx);
  };

  return (
    <FormGroup>
      <Select type={type} extend={extend}>
        <SelectHeader onClick={() => setExtend(!extend)}>
          <SelectName type={type} active={current ? true : false}>
            {current ? current.name : "Select a channel"}
          </SelectName>
          <SelectIcon type={type}>
            <i className="fas fa-sort-down"></i>
          </SelectIcon>
        </SelectHeader>
        <SelectBody showBody={extend}>
          {options.map((option, idx) => (
            <Option
              key={`${option.name}-${idx}`}
              onClick={() => handleOptionClick(idx)}
            >
              {option.name}
            </Option>
          ))}
        </SelectBody>
      </Select>
    </FormGroup>
  );
};

export default Dropdown;
