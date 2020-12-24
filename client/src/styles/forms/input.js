import styled from "styled-components";
import utils from "../utils";
import { FORM_CONSTANTS } from "../theme";

const FormGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  font-size: ${FORM_CONSTANTS.regFontSize};
  padding: ${() =>
    `sm sm sm ${FORM_CONSTANTS.paddingRight}rem`
      .split(" ")
      .reduce((acc, cur) => {
        acc.push(utils.getSizing(cur));
        return acc;
      }, [])
      .join(" ")};
  transition: all 300ms ease-in;
  ${(props) => utils.getStyle(props.type, "input")}
  border-color: ${(props) => (props.taken ? "red" : "")}
`;

const inputStyles = {
  FormGroup,
  Input,
};

export default inputStyles;
