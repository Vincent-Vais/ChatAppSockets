import utils from "./utils";
import { css } from "styled-components";

// Colors
export const colors = {
  alphaRegular: "55, 65,250",
  alphaLight: "135,140,250",
  alphaDark: "6, 16,208",

  betaRegular: "126, 43,250",
  betaLight: "177,127,249",
  betaDark: "85, 4,206",

  gammaRegular: "36,165,249",
  gammaLight: "123,199,249",
  gammaDark: " 2,122,200",

  white: "255,255,255",
  gray: "244,244,244",
  dark: "51,51,51",
  black: "0,0,0",
};

// Box Shadows
export const elevations = {
  smBottom: "0 5px 4px -4px rgba(0,0,0,0.5)",
  regBottom: "0 10px 6px -6px rgba(0,0,0,0.5)",
};

// Border-radius
export const radiuses = {
  small: "3px",
  regular: "5px",
};

// Margin and padding
export const sizes = {
  tn: "0.5rem",
  sm: "1rem",
  md: "1.5rem",
  bg: "2rem",
  hg: "3rem",
};

// Fonts
export const fonts = {
  h1: {
    size: "4rem",
    weight: "700",
  },
  h2: {
    size: "3.5rem",
    weight: "100",
  },
  h3: {
    size: "3rem",
    weight: "400",
  },
  h4: {
    size: "2.5rem",
    weight: "400",
  },
  h5: {
    size: "2rem",
    weight: "300",
  },
  cta: {
    size: "2rem",
    weight: "700",
  },
  p: {
    size: "1.6rem",
    weight: "300",
  },
};

// Forms
export const FORM_CONSTANTS = {
  regFontSize: fonts["h4"].size,
  regFontWeight: fonts["h4"].weight,
  smallFontSize: fonts["h5"].size,
  smallFontWeight: fonts["h5"].weight,
  activeColor: utils.getColor("alphaDark"),
  activeColorAlt: utils.getColor("betaLight"),
  grayColor: utils.getColor("gray"),
  whiteColor: utils.getColor("white"),
  blueColor: utils.getColor("gammaLight"),
  lightBlueColor: utils.getColor("alphaLight"),
  darkColor: utils.getColor("dark"),
  blackColor: utils.getColor("black"),
  paddingRight: 6,
};
export const formStyles = {
  home: {
    input: css`
      background: ${FORM_CONSTANTS.grayColor};
      color: ${FORM_CONSTANTS.blackColor};
      border-radius: ${() => utils.getRoundness("regular")};
      border: 2px solid transparent;
      border-color: ${(props) =>
        props.active ? FORM_CONSTANTS.activeColor : "transparent"};
      transform: ${(props) => (props.active ? "translateY(-4px)" : "")};
      box-shadow: ${(props) =>
        props.active ? utils.getElevation("regBottom") : ""};
    `,
    labelIcon: css`
      border-right: 2px solid
        ${(props) =>
          props.active ? FORM_CONSTANTS.activeColor : FORM_CONSTANTS.darkColor};
      transform: ${(props) =>
        props.active ? "translate(0, -55%)" : "translate(0, -50%)"};
      color: ${(props) =>
        props.active ? FORM_CONSTANTS.activeColor : FORM_CONSTANTS.darkColor};
    `,
    select: css`
      background: ${FORM_CONSTANTS.grayColor};
      color: ${FORM_CONSTANTS.blackColor};
      border-radius: ${() => utils.getRoundness("regular")};
      border: 2px solid transparent;
      box-shadow: ${(props) =>
        props.extend ? utils.getElevation("regBottom") : ""};
      border-radius: ${utils.getRoundness("regular")};
      border-color: ${(props) =>
        props.extend ? FORM_CONSTANTS.activeColor : "transparent"};
    `,
    selectName: css`
      color: ${(props) =>
        props.active ? FORM_CONSTANTS.blackColor : FORM_CONSTANTS.darkColor};
    `,
    selectIcon: css`
      color: ${FORM_CONSTANTS.darkColor};
    `,
  },
  channel: {
    input: css`
      border-bottom: 2px solid
        ${(props) =>
          props.active
            ? FORM_CONSTANTS.activeColorAlt
            : FORM_CONSTANTS.blueColor};
      background: ${FORM_CONSTANTS.grayColor};
    `,
    labelIcon: css`
      transform: translate(0, -50%);
      color: ${(props) =>
        props.active
          ? FORM_CONSTANTS.activeColorAlt
          : FORM_CONSTANTS.blueColor};
    `,
    select: css`
      background: ${FORM_CONSTANTS.activeColor};
      color: ${FORM_CONSTANTS.whiteColor};
    `,
    selectName: css`
      color: ${(props) =>
        props.active ? FORM_CONSTANTS.whiteColor : FORM_CONSTANTS.grayColor};
    `,
    selectIcon: css`
      color: ${FORM_CONSTANTS.grayColor};
    `,
  },
  users: {
    select: css`
      background: ${FORM_CONSTANTS.lightBlueColor};
      color: ${FORM_CONSTANTS.whiteColor};
    `,
    selectName: css`
      color: ${FORM_CONSTANTS.whiteColor};
      font-size: ${FORM_CONSTANTS.regFontSize};
      font-weight: ${FORM_CONSTANTS.regFontWeight};
    `,
    selectIcon: css`
      color: ${FORM_CONSTANTS.grayColor};
    `,
  },
};
