import utils from "./utils";
import styled from "styled-components";

const Header = styled.h1`
  text-transform: capitalize;
  text-align: center;
  font-size: ${utils.getFontSize("h1")};
  font-weight: ${utils.getFontWeight("h1")};
  color: ${(props) => utils.getColor(props.color)};
`;

const SubHeader = styled.span`
  font-size: ${utils.getFontSize("h3")};
  font-weight: ${utils.getFontWeight("h3")};
  color: ${(props) => utils.getColor(props.color)};
`;

const typo = { Header, SubHeader };

export default typo;
