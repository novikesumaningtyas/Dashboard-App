import React from "react";
import { Button } from "react-bootstrap";
import { IPaddingValues, PaddedDiv } from "../PaddedDiv/PaddedDiv";

export interface IPaddedNavButton {
  /** 'nextButtonId' defaults to 'next-page' */
  nextButtonId?: string;
  /** 'previousButtonId' defaults to 'previous-page' */
  previousButtonId?: string;
  /** callback when 'Previous' is clicked */
  onPrevious?: () => void;
  /**  Previous button variant defaults to 'outline-primary'  */
  previousButtonVariant?: "primary" | "outline-primary";
  /**  Next button variant defaults to 'primary'  */
  nextButtonVariant?: "primary" | "outline-primary";
  /** Default to 'Next' */
  nextButtonLabel?: string;
  /** Default to 'Previous' */
  previousButtonLabel?: string;
  /** Whether the next button is shown. Defaults to true */
  showNext?: boolean;
  /** Whether the previous button is shown. Defaults to true */
  showPrevious?: boolean;
  /** Padding on top of the button. Defaults to 0px */
  paddingTop?: IPaddingValues;
  /** Padding on bottom of the button. Defaults to 0px */
  paddingBottom?: IPaddingValues;
}

const dummyCallback = () => undefined;

export function PaddedNavButton({
  nextButtonId = "next-page",
  previousButtonId = "previous-page",
  onPrevious = dummyCallback,
  previousButtonVariant = "outline-primary",
  nextButtonVariant = "primary",
  nextButtonLabel = "Next",
  previousButtonLabel = "Previous",
  showNext = true,
  showPrevious = true,
  paddingTop = "0",
  paddingBottom = "0",
}: IPaddedNavButton) {
  return (
    <>
      <PaddedDiv paddingBottom={paddingBottom} paddingTop={paddingTop}>
        {showPrevious && (
          <PaddedDiv
            marginRight={"24px"}
            marginBottom={"16px"}
            marginTop={"16px"}
            paddingBottom={"0"}
            paddingRight={'24px'}
            float={"left"}
          >
            <Button
              id={previousButtonId}
              variant={previousButtonVariant}
              onClick={onPrevious}
            >
              {previousButtonLabel}
            </Button>
          </PaddedDiv>
        )}
        {showNext && (
          <PaddedDiv
            paddingBottom={"0"}
            marginBottom={"16px"}
            marginTop={"16px"}
            float={"right"}
          >
            <Button id={nextButtonId} variant={nextButtonVariant} type="submit">
              {nextButtonLabel}
            </Button>
          </PaddedDiv>
        )}
      </PaddedDiv>
    </>
  );
}
