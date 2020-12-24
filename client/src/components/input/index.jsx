import React, { useState, useRef } from "react";

import forms from "../../styles/forms";

const { FormGroup, Input, Label, LabelIcon } = forms;

const ReactInput = ({
  initialValue,
  handleChange,
  iconClass,
  placeholder,
  type,
  taken,
}) => {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const setFocus = () => {
    ref.current.focus();
    setActive(true);
  };
  const removeFocus = () => {
    setActive(false);
  };

  return (
    <FormGroup>
      <Input
        ref={ref}
        onClick={() => setFocus()}
        active={active}
        onBlur={() => removeFocus()}
        value={initialValue}
        onChange={(event) => handleChange(event.target.value)}
        type={type}
        taken={taken}
      />
      {taken && (
        <span
          style={{
            position: "absolute",
            top: "50%",
            right: "10%",
            transform: "translate(0, -50%)",
            width: "20rem",
            height: "2.5rem",
            color: "red",
            fontSize: "1.6rem",
          }}
        >
          This username is taken
        </span>
      )}
      <Label
        animate={active || initialValue.length ? "hideLabel" : "showLabel"}
        onClick={() => setFocus()}
      >
        {placeholder}
      </Label>
      <LabelIcon onClick={() => setFocus()} active={active} type={type}>
        <i className={iconClass}></i>
      </LabelIcon>
    </FormGroup>
  );
};

export default ReactInput;
