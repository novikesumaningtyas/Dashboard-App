import styled from "styled-components";
import { Table } from "react-bootstrap";
import { COLOR } from "../../../lib/color";

export const StyledTable = styled(Table)`
  background-color: ${COLOR.WHITE};
`;

interface IRow {
  isRowOpen?: boolean;
}

export const StyledTRow = styled.tr<IRow>`
  display: flex;
  flex-flow: row wrap;

  overflow: hidden;
  border-top: ${(props) =>
    props.isRowOpen ? "" : `1px solid ${COLOR.GREY70}`};
  outline: ${(props) => (props.isRowOpen ? `auto ${COLOR.GREY70}` : "")};
  border-bottom: none !important;
  > td {
    background-color: ${(props) => (props.isRowOpen ? COLOR.GREY90 : "")};
  }

  &:last-child {
    border-bottom: ${(props) =>
      props.isRowOpen ? "" : `1px solid ${COLOR.GREY70} !important`};
  }

  &:hover {
    > td > div > div > div > div > div > label {
      background-color: ${COLOR.GREY90};
    }
  }
`;

export const StyledTheadRow = styled.tr`
  display: flex;
  flex-flow: row wrap;
  border-bottom: none !important;
`;

export const StyledTd = styled.td`
  flex: 1;
  display: block;
  padding: 5px;

  &:last-child[hidden] {
    display: none;
  }

  &:last-child {
    background: ${COLOR.WHITE};
    flex: 1 1 100%;
  }
`;

export const StyledTdDescription = styled.td`
  flex: 1;
  display: block;
  padding: 24px;

  &:last-child[hidden] {
    display: none;
  }

  &:last-child {
    background: ${COLOR.WHITE};
    flex: 1 1 100%;
  }
`;

export const StyledTh = styled.th`
  padding: 5px;
  flex: 1;
  display: block;
  text-align: left;

  &:last-child {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
  }
`;

export const SideHeaderCheckbox = styled.div<IRow>`
  > div > div > div > label {
    border: none !important;
    margin: 0;
    outline: transparent;
    font-family: "SourceSansPro", Helvetica, Arial, sans-serif;
    font-size: 1.5rem;
    line-height: 2rem;
    color: ${COLOR.BLACK};
    padding: 0.75rem 1rem 0rem 3rem;
  }

  > div > div > div {
    &:nth-child(2) {
      display: none !important;
    }
  }
`;

export const SideApiCheckbox = styled.div<IRow>`
  > div > div > div > label {
    border: none !important;
    margin: 0;
    outline: transparent;
    font-family: "SourceSansPro", Helvetica, Arial, sans-serif;
    font-size: 1.5rem;
    line-height: 2rem;
    color: ${COLOR.BLACK};
    font-weight: 300;
    background-color: ${(props) => (props.isRowOpen ? COLOR.GREY90 : "")};
    padding: 0.75rem 1rem 0.75rem 3rem;
  }

  > div > div > div {
    &:nth-child(2) {
      display: none !important;
    }
  }
`;

export const ErrorDiv = styled.div`
  margin-top: 1rem;
  margin-bottom: 0;
  display: flex;
  width: 100%;
`;

export const ErrorParagraph = styled.p`
  color: ${COLOR.PRIMARY};
  margin: 0 0 0 0.5rem;
`;

export const StyledApiDiv = styled.div`
  display: flex;
  padding: 1px;
`;