import React, { useState } from "react";

import f from "../../styles/forms";

const {
  FormGroup,
  Select,
  SelectHeader,
  SelectName,
  SelectIcon,
  SelectBody,
  Option,
} = f;

const UsersModal = ({ users, username }) => {
  const [extend, setExtend] = useState(false);
  const type = "users";
  return (
    <FormGroup>
      <Select type={type} extend={extend}>
        <SelectHeader onClick={() => setExtend(!extend)}>
          <SelectName type={type}>{"Show Users"}</SelectName>
          <SelectIcon type={type}>
            <i className="fas fa-sort-down"></i>
          </SelectIcon>
        </SelectHeader>
        <SelectBody showBody={extend}>
          {users.map(
            (user, idx) =>
              user !== username && (
                <Option key={`${user}-${idx}`}>{user}</Option>
              )
          )}
        </SelectBody>
      </Select>
    </FormGroup>
  );
};

export default UsersModal;
