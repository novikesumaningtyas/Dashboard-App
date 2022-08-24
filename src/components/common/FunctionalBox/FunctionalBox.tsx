import React from "react";
import { BodyBox, Canvas, HeaderBox } from "./FunctionalBox.style";
import { IPaddingValues, PaddedDiv } from "../PaddedDiv/PaddedDiv";

export interface IFunctionalBox {
  id?: string;
  title: string;
  children?: React.ReactNode;
  paddingTop?: IPaddingValues;
  paddingBottom?: IPaddingValues;
}

function FunctionalBox({
  id = "FunctionalBox",
  title = "",
  children,
  paddingTop = "0",
  paddingBottom = "24px",
}: IFunctionalBox) {
  return (
    <PaddedDiv paddingBottom={paddingBottom} paddingTop={paddingTop}>
      <Canvas>
        <HeaderBox>
          <h4>{title}</h4>
        </HeaderBox>
        <BodyBox>{children}</BodyBox>
      </Canvas>
    </PaddedDiv>
  );
}

export default FunctionalBox;
