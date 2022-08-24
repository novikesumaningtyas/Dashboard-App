import styled from "styled-components";
import { COLOR } from "../../../lib/color";

export const StyledBack = styled.div`
  text-align: left;
  padding-bottom: 24px;
  role: button;

  &:hover {
    text-decoration: underline !important;
    cursor: pointer;
    color: ${COLOR.PRIMARY};
  }
`;

interface IParagraph {
  textAlign?: "left" | "right" | "inherit" | "none";
  fontSize?: string;
}

export const StyledParagraph = styled.p<IParagraph>`
  text-align: ${(props) => props.textAlign ?? "left"};
  display: flex;
  font-size: ${(props) => props.fontSize ?? "1rem"};
`;

export const HeaderWithDesc = styled.div`
  overflow: hidden;
  height: auto;
  text-align: left;
  border-bottom: 3px solid ${COLOR.GREY90};
`;

export const HeaderDetails = styled.div`
  display: flex;
  border-bottom: 3px solid ${COLOR.GREY90};
`;
