import styled from "styled-components";
import { rem } from "polished";
import { COLOR } from "../../../lib/color";

interface IVariant {
  variant: "info" | "success" | "error" | "warning";
}

function getColor({ variant }: IVariant) {
  const colors = {
    info: COLOR.SLATE,
    success: COLOR.EMERALD,
    error: COLOR.ERROR,
    warning: COLOR.AMBER,
  };

  return colors[variant];
}

export const StyledFormMessageWrapper = styled.div`
  padding: ${rem("24px")};
  border: 1px solid ${getColor};
  border-radius: 8px;
  background: ${COLOR.WHITE};
  display: flex;

  svg {
    margin-top: -2px;
  }
`;

export const StyledBody = styled.div`
  margin-left: 16px;
  flex: 1;
`;

export const StyledTitle = styled.p`
  color: ${COLOR.BLACK};
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 8px;
  margin-top: 0;
`;

export const StyledSpan = styled.span`
  margin-bottom: 8px;
`;

export const StyledMessageBody = styled.div`
  color: ${COLOR.BLACK};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin:0;

  p {
    margin:0;
    color: ${COLOR.BLACK};
  }
`;
