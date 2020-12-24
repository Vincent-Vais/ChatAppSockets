import React from "react";

import { useSelector, shallowEqual } from "react-redux";
import selector from "../../store/selectors/user";

import s from "../../styles";

const { Container, SubHeader } = s;

const Message = ({ data }) => {
  const username = useSelector(selector.selectUserName, shallowEqual);
  if (!data.user)
    return (
      <Container
        padding="bg md bg md"
        background={"alphaLight"}
        elevated="smBottom"
        radius="regular"
        width="98%"
        margin="sm auto sm auto"
      >
        <SubHeader color="gray">{data.message}</SubHeader>
      </Container>
    );
  return (
    <Container
      padding="bg md bg md"
      background={data.user === username ? "betaLight" : "gammaDark"}
      elevated="smBottom"
      radius="regular"
      max-width="35rem"
      margin={data.user === username ? "sm sm sm auto" : "sm auto sm sm"}
    >
      <SubHeader color="gray">{data.user}</SubHeader>
      <SubHeader color="gray">{" : "}</SubHeader>
      <SubHeader color="gray">{data.message}</SubHeader>
    </Container>
  );
};

export default Message;
