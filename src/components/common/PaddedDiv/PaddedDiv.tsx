import styled from "styled-components";

export type IPaddingValues = "0" | "8px" | "16px" | "24px" | "32px" | "40px";
export type ITextAlignValues = "center" | "left" | "right" | "justify";
export type IFloatValues = "left" | "right" | "inherit" | "none";

export interface IPaddedRowProps {
  paddingBottom?: IPaddingValues;
  paddingTop?: IPaddingValues;
  paddingRight?: IPaddingValues;
  paddingLeft?: IPaddingValues;

  marginBottom?: IPaddingValues;
  marginTop?: IPaddingValues;
  marginRight?: IPaddingValues;
  marginLeft?: IPaddingValues;

  textAlign?: ITextAlignValues;
  float?: IFloatValues;
  display?: string;
}

/**
 * Styled div that allows you to set is padding, margin, text-align, to values specified in the standard form grid.
 */

export const PaddedDiv = styled.div<IPaddedRowProps>`
  padding-bottom: ${(props) => props.paddingBottom ?? "24px"};
  padding-top: ${(props) => props.paddingTop ?? "0"};
  padding-right: ${(props) => props.paddingRight ?? "0"};
  padding-left: ${(props) => props.paddingLeft ?? "0"};

  margin-bottom: ${(props) => props.paddingBottom ?? "0"};
  margin-top: ${(props) => props.paddingTop ?? "0"};
  margin-right: ${(props) => props.paddingRight ?? "0"};
  margin-left: ${(props) => props.paddingLeft ?? "0"};

  text-align: ${(props) => props.textAlign ?? ""};
  float: ${(props) => props.float ?? "none"};
  display: ${(props) => props.display ?? ""};
`;
