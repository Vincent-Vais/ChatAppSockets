import utils from "./utils";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${(props) => utils.getColor(props.background)};
  box-shadow: ${(props) => utils.getElevation(props.elevated)};
`;

const Container = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-shadow: ${(props) => utils.getElevation(props.elevated)};
  background: ${(props) => utils.getColor(props.background)};
  border-radius: ${(props) => utils.getRoundness(props.radius)};
  overflow: ${(props) => props.overflow};
  text-align: ${(props) => props.align};
  position: ${(props) => props.position};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  transform: ${(props) => props.transform};
  flex: ${(props) => props.flex};
  border-color: ${(props) => utils.getColor(props["border-color"])};
  border: ${(props) => props.border};
  max-width: ${(props) => props["max-width"]};
  overflow-y: ${(props) => props["overflow-y"]};
  margin: ${(props) =>
    props.margin
      ? props.margin
          .split(" ")
          .reduce((acc, cur) => {
            acc.push(utils.getSizing(cur));
            return acc;
          }, [])
          .join(" ")
      : ""};
  padding: ${(props) =>
    props.padding
      ? props.padding
          .split(" ")
          .reduce((acc, cur) => {
            acc.push(utils.getSizing(cur));
            return acc;
          }, [])
          .join(" ")
      : ""};
`;

const FlexContainer = styled(Container)`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props["justify-content"]};
  align-items: ${(props) => props["align-items"]};
`;

const CtaContainer = styled(Container)`
  cursor: pointer;
  color: ${(props) => utils.getColor(props.color)};
  box-shadow: ${utils.getElevation("smBottom")};
  font-size: ${utils.getFontSize("cta")};
  font-weight: ${utils.getFontWeight("cta")};
  transition: all 300ms ease-in;
  &:hover {
    box-shadow: ${utils.getElevation("regBottom")};
    transform: translateY(-4px);
  }
  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

const layout = { Page, Container, FlexContainer, CtaContainer };

export default layout;
