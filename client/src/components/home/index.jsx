import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import actions from "../../store/actions";
import selectors from "../../store/selectors";

import socketClient from "../withSocket";

import ReactInput from "../input";
import Dropdown from "../dropdown";

import styledElements from "../../styles";
import stylesObject from "./styles";

const { Page, Container, FlexContainer, Header, CtaContainer } = styledElements;

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [taken, setTaken] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const allChannels = useSelector(
    selectors.channels.selectAllChannels,
    shallowEqual
  );
  const currentChannel = useSelector(
    selectors.channels.selectCurrentChannel,
    shallowEqual
  );

  useEffect(() => {
    socketClient.subscribe("usernameNotification", (message) => {
      const { token } = JSON.parse(message);
      localStorage.setItem("token", token);
      if (token) {
        setTaken(false);
      } else {
        setTaken(true);
      }
    });

    socketClient.subscribe("authNotification", () => {
      setRedirect(true);
    });
  }, [currentChannel]);

  useEffect(() => {
    if (redirect) {
      history.push(`/${currentChannel.name}`);
      dispatch(actions.user.setUserName(username));
    }
  }, [redirect, currentChannel, username]);

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (currentChannel) {
      socketClient.emit("authEvent", JSON.stringify({ token }));
    } else {
      alert("select a channel");
    }
  };

  const handleInputChange = (username) => {
    setUsername(username);
    socketClient.emit("usernameEvent", JSON.stringify({ username }));
  };
  return (
    <Page {...stylesObject.page}>
      <Container {...stylesObject.mainContainer}>
        <FlexContainer {...stylesObject.flexContainer}>
          <Header color="gray">
            <span style={{ marginRight: "1rem" }}>
              <i className="fas fa-comments"></i>
            </span>
            {`Chat App`}
          </Header>
        </FlexContainer>
        <FlexContainer {...stylesObject.flexContainerInputs}>
          <Container width="60%" margin="0 0 md 0">
            <ReactInput
              initialValue={username}
              handleChange={handleInputChange}
              iconClass="fas fa-user"
              placeholder="John Doe"
              type="home"
              taken={taken}
            />
          </Container>
          <Container width="60%" margin="0 0 auto 0">
            <Dropdown
              options={allChannels}
              current={currentChannel}
              handleChange={(idx) => dispatch(actions.channels.setCurrent(idx))}
              type="home"
            />
          </Container>
          <CtaContainer
            as="button"
            {...stylesObject.button}
            onClick={handleClick}
          >
            Join Chat
          </CtaContainer>
        </FlexContainer>
      </Container>
    </Page>
  );
};

export default Home;
