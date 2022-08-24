import React, { useState } from "react";
import {
  FcOk as SuccessFillIcon,
  FcAbout as InfoFillIcon,
  FcCancel as ErrorIcon,
  FcVlc as WarningIcon,
} from "react-icons/fc";
import {
  StyledFormMessageWrapper,
  StyledBody,
  StyledMessageBody,
} from "./FormMessage.style";

export interface IFormMessage {
  /** The type of message allowed, if empty default to 'info' */
  variant?: "info" | "success" | "error" | "warning";
  /** Message heading */
  title: string;
  /** Children */
  children: React.ReactNode;
  /** Set focus on or outside of Message box title */
  focused?: boolean;
}

const iconMap = {
  info: InfoFillIcon,
  warning: WarningIcon,
  success: SuccessFillIcon,
  error: ErrorIcon,
};

export function FormMessage({
  variant = "info",
  focused = false,
  title,
  children,
}: IFormMessage) {
  const Icon = iconMap[variant];
  const messageRef = React.useRef();
  const titleRef = React.useRef();
  const messageTitleRef = titleRef;

  return (
    <StyledFormMessageWrapper
      variant={variant}
      data-component-id={"FormMessage"}
    >
      <Icon size="lg" />
      <StyledBody>
        {title}
        <StyledMessageBody>
          <div>{children}</div>
        </StyledMessageBody>
      </StyledBody>
    </StyledFormMessageWrapper>
  );
}
