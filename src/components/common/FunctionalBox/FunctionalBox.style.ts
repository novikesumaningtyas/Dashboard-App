import styled from "styled-components";
import { COLOR } from "../../../lib/color";

export const Canvas = styled.div`
  border-radius: 4px;
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.GREY50};
`;

export const HeaderBox = styled.div`
  width: 100%;
  padding: 16px 24px 16px 24px;
  border-bottom: 1px solid ${COLOR.GREY50};
  text-align: left;
`;

export const BodyBox = styled.div`
  padding: 16px 24px 16px 24px;
  margin: 0;
  outline: transparent;
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${COLOR.BLACK};
  font-weight: 400;
  text-align: left;
`;
export const CheckboxCanvas = styled.div`
  padding: 24px 24px 16px 0px;
  > div > div > div > label {
    border: 1px solid ${COLOR.GREY50};
  }
`;
