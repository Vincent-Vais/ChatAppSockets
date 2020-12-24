import {
  colors,
  elevations,
  radiuses,
  sizes,
  fonts,
  formStyles,
} from "./theme";

const getRGB = (str) => {
  const [r, g, b] = str.replaceAll(/\s+/gi, "").split(",").slice(0, 3);
  return `rgb(${r}, ${g}, ${b})`;
};

const utils = {
  getColor: (key) => (colors[key] ? getRGB(colors[key]) : ""),
  getElevation: (key) => (elevations[key] ? elevations[key] : ""),
  getRoundness: (key) => (radiuses[key] ? radiuses[key] : ""),
  getSizing: (key) => (sizes[key] ? sizes[key] : key),
  getFontSize: (key) => (fonts[key] ? fonts[key].size : key),
  getFontWeight: (key) => (fonts[key] ? fonts[key].weight : key),
  getStyle: (type, element) => formStyles[type][element],
};

export default utils;
