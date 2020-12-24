import styled from "styled-components";
import utils from "../utils";
import { FORM_CONSTANTS } from "../theme";

const Select = styled.div`
  width: 100%;
  font-size: ${FORM_CONSTANTS.regFontSize};
  transition: all 300ms ease-in;
  max-height: ${(props) => (props.extend ? "60rem" : "5rem")};
  overflow-y: scroll;
  ${(props) => utils.getStyle(props.type, "select")}
`;

const SelectHeader = styled.li`
  position: relative;
  text-align: left;
  padding: ${() =>
    `sm bg sm bg`
      .split(" ")
      .reduce((acc, cur) => {
        acc.push(utils.getSizing(cur));
        return acc;
      }, [])
      .join(" ")};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: capitalize;
`;

const SelectName = styled.span`
  font-size: ${(props) =>
    props.active ? FORM_CONSTANTS.regFontSize : FORM_CONSTANTS.smallFontSize};
  font-weight: ${(props) =>
    props.active
      ? FORM_CONSTANTS.regFontWeight
      : FORM_CONSTANTS.smallFontWeight};
  ${(props) => utils.getStyle(props.type, "selectName")}
`;

const SelectIcon = styled.span`
  position: absolute;
  top: 42.5%;
  right: 5%;
  transform: translate(0, -50%);
  font-size: ${FORM_CONSTANTS.regFontSize};
  cursor: pointer;
  ${(props) => utils.getStyle(props.type, "selectIcon")}
`;

const SelectBody = styled.ul`
  transition: all 400ms ease-in;
  opacity: ${(props) => (props.showBody ? "1" : "0")};
  visibility: ${(props) => (props.showBody ? "show" : "hidden")};
`;

const Option = styled.li`
  cursor: pointer;
  padding: ${() =>
    `sm sm sm sm`
      .split(" ")
      .reduce((acc, cur) => {
        acc.push(utils.getSizing(cur));
        return acc;
      }, [])
      .join(" ")};
  overflow-x: scroll;
  &:hover {
    background: ${FORM_CONSTANTS.activeColorAlt};
  }
`;

const dropdownStyles = {
  Select,
  SelectHeader,
  SelectName,
  SelectIcon,
  SelectBody,
  Option,
};

export default dropdownStyles;
