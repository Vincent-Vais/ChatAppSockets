import React, { useState, useEffect } from "react";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import actions from "../../store/actions/channels";
import selectors from "../../store/selectors";

import { useHistory } from "react-router-dom";

import socketClient from "../withSocket";

import Dropdown from "../dropdown";
import ReactInput from "../input";
import Message from "../message";
import UsersModal from "../users-modal";

import styledElements from "../../styles";
import stylesObject from "./styles";

const { Page, FlexContainer, Container, CtaContainer } = styledElements;

const Channel = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const username = useSelector(selectors.user.selectUserName, shallowEqual);
  const allChannels = useSelector(selectors.channels.selectAllChannels);
  const currentChannel = useSelector(
    selectors.channels.selectCurrentChannel,
    shallowEqual
  );
  const messages = useSelector(selectors.channels.selectCurrentMessages);
  const currentUsers = useSelector(selectors.channels.selectCurrentUsers);

  useEffect(() => {
    socketClient.subscribe("systemNotification", (data) =>
      dispatch(actions.handleSystemNotification(JSON.parse(data)))
    );

    socketClient.subscribe("chatNotification", (message) =>
      dispatch(actions.addMessageToChannel(JSON.parse(message)))
    );

    socketClient.emit(
      "systemEvent",
      JSON.stringify({
        username,
        channelName: currentChannel.name,
        joined: true,
      })
    );

    return () => {
      socketClient.emit(
        "systemEvent",
        JSON.stringify({
          username,
          channelName: currentChannel.name,
          joined: false,
        })
      );
    };
  }, [currentChannel]);

  const changeChannel = (idx) => {
    dispatch(actions.setCurrent(idx));
    history.push(`/${allChannels[idx].name}`);
  };

  const sendMessage = () => {
    socketClient.emit(
      "chatEvent",
      JSON.stringify({
        user: username,
        message: message,
        channelName: currentChannel.name,
      })
    );
    setMessage("");
  };
  return (
    <Page {...stylesObject.page}>
      <FlexContainer {...stylesObject.flexContainer}>
        <Container {...stylesObject.colOneSix}>
          <Dropdown
            options={allChannels}
            current={currentChannel}
            handleChange={(idx) => changeChannel(idx)}
            type="channel"
          />
          <UsersModal users={currentUsers} username={username} />
        </Container>
        <Container {...stylesObject.colFiveSix}>
          <FlexContainer
            width="100%"
            height="90%"
            overflow-y="scroll"
            direction="column"
          >
            {messages.map((message, idx) => (
              <Message key={`${message.id}-${idx}`} data={message} />
            ))}
          </FlexContainer>
          <FlexContainer width="100%" height="10%" padding="0 md 0 md">
            <Container flex="1 1 75%" padding="0 md 0 md">
              <ReactInput
                initialValue={message}
                handleChange={(message) => setMessage(message)}
                iconClass="fas fa-envelope"
                placeholder="Hello world"
                type="channel"
              />
            </Container>
            <Container flex="1 1 25%">
              <CtaContainer
                as="button"
                {...stylesObject.button}
                onClick={sendMessage}
              >
                Send
              </CtaContainer>
            </Container>
          </FlexContainer>
        </Container>
      </FlexContainer>
    </Page>
  );
};

export default Channel;
