import styled from "styled-components";
import { COLOR } from "../../lib/color";
import {  Button } from "react-bootstrap";

export const PageTitle = styled.div`
  text-align: left !important;
`;

export const StyledAppCanvasContainer = styled.div`
  width: 100%;
  border-radius: 2px;
  height: auto;
  background-color: ${COLOR.WHITE};
`;

export const AppCardOptionContainer = styled.div`
  margin-bottom: 24px;
  padding: 16px 16px 24px 24px;
  display: flex;
  width: 90%;
  box-shadow: 0px 0px 4px 0px ${COLOR.GREY50};
  border-radius: 8px;
  overflow: auto;
  background-color: ${COLOR.WHITE};
  height: auto;
  transition: box-shadow 300ms ease-in, border-color 300ms ease-in;
  text-align: left;

  &:hover {
    box-shadow: 0px 0px 16px 0px ${COLOR.GREY50};
    text-decoration: underline !important;
    cursor: pointer;
  }

  &:focus {
    border: 3px solid ${COLOR.BLACK};
    box-shadow: 0px 0px 16px 0px ${COLOR.GREY50};
  }
`;

export const StyledBodyContent = styled.div`
  role: button;
  overflow: hidden;
  position: relative;
  color: ${COLOR.BLACK};
  text-align: left;
  border-radius: 8px;
  width: 100%;

  &:hover {
    cursor: pointer;
    text-decoration: underline !important;
  }
`;

export const MaxWidthButtonOption = styled(Button)`
  width: 100%;
  text-align: left !important;
  font-size:24px;
  font-weight: lighter;
  margin-right: 16px;
  text-decoration: none;
  border: none !important;
  color: ${COLOR.BLACK};
  background-color: transparent;


  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  &:focus {
    outline: none !important;
    border: none !important;
    border-color:  transparent !important;  
    text-decoration: underline;               
  }

`;

export const AppCardContainer = styled.div`
  margin-bottom: 24px;
  padding: 16px 16px 24px 24px;
  box-shadow: 0px 0px 4px 0px ${COLOR.GREY50};
  border-radius: 8px;
  overflow: hidden;
  background-color: ${COLOR.WHITE};
  width: 90%;
  height: auto;
  transition: box-shadow 300ms ease-in, border-color 300ms ease-in;
  text-align: left;


  &:hover {
    box-shadow: 0px 0px 16px 0px ${COLOR.GREY50};
    cursor: pointer;
  }

  &:focus {
    border: 3px solid ${COLOR.BLACK};
    box-shadow: 0px 0px 16px 0px ${COLOR.GREY50};
  }

`;

export const Border = styled.div`
  border-bottom: 3px solid ${COLOR.GREY90}
`;
