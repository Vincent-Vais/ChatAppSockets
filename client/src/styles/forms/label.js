import styled, { keyframes } from "styled-components";
import { FORM_CONSTANTS } from "../theme";
import utils from "../utils";

const Label = styled.label`
  position: absolute;
  font-size: ${FORM_CONSTANTS.smallFontSize};
  font-weight: ${FORM_CONSTANTS.smallFontWeight};
  top: 50%;
  left: ${FORM_CONSTANTS.paddingRight}rem;
  transform: translate(0, -50%) scale(1);
  color: ${FORM_CONSTANTS.darkColor};
  animation: ${(props) => animations[props.animate]} 300ms ease-in forwards;
`;
const hideLabel = keyframes`
  0%{
    transform: translate(0, -50%) scale(1);
    opacity: 1;
  }
  100%{
    transform: translate(-3rem, -3rem) scale(0.25);
    opacity: 0.75;
  }
`;
const showLabel = keyframes`
  0%{
    transform: translate(-3.5rem, -3.5rem) scale(0.25);
    opacity: 0.75;
  }
  100%{
    transform: translate(0, -50%) scale(1);
    opacity: 1;
  }
`;
const animations = {
  hideLabel,
  showLabel,
};

const LabelIcon = styled.span`
  position: absolute;
  top: 50%;
  height: 100%;
  left: 0;
  width: ${FORM_CONSTANTS.paddingRight - 1}rem;
  font-size: ${FORM_CONSTANTS.regFontSize};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 150ms linear;
  ${(props) => utils.getStyle(props.type, "labelIcon")}
`;

const labelStyles = {
  Label,
  LabelIcon,
};

export default labelStyles;
