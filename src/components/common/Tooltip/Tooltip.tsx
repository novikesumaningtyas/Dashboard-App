import React, {useState} from "react";
import styled from "styled-components";

const VISIBLE = "visible";
const NOT_VISIBLE = "not-visible";

export const Tooltip = ({className, content, alignment ="", children}:any) => {
  const [visibility, setVisibility] = useState(NOT_VISIBLE);
  const variation = alignment === "" ? "centered" : alignment;
  const toggleVisibility = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    setVisibility(visibility === VISIBLE ? NOT_VISIBLE : VISIBLE);
  };

  return (
    <StyledTooltip
      onClick={toggleVisibility}
      data-testid="tooltip"
      className={`tooltip ${className || ""} ${variation || ""}`}
    >
      {children}
      <div className={`tip ${visibility}`}>
        <div className="tip-container">{content}</div>
      </div>

    </StyledTooltip>
  )
}

const StyledTooltip = styled.div`
  position: relative;
  cursor: help;
  display: inline-block;
  &:hover,
  &:focus {
    .tip.not-visible{
      display: inline;
    }
  }
  .tip-container {
    background-color: black;
    position: relative;
    padding: 10px;
    border-radius: 5px;
    &:after {
      content: "",
      width: 10px;
      height: 10px;
      transform: rotate(45deg);
      background: black;
      position: absolute;
      bottom: -5px;
      z-index: 0;
      border-radius: 1px;
      left: 48%;
      left: calc(50% - 5px);
    }
  }
  &.centered {
    .tip-container {
      right: -50%;
    }
    .tip{
      right: 50%;
      bottom: 170%;
    }
  }
  &.right,
  &.right-aligned {
    .tip-container {
      &:after {
        left: calc(100% - 36px);
      }
    }
    .tip {
      right: -20px;
      bottom: 170%
    }
  }
  &.bottom{
    .tip-container {
      right: -50%;
      &:after {
        top: -5px;
        bottom: auto;
      }
    }
    .tip {
      right: 50%;
      top: 130%;
    }
  }
  .tip{
    &.not-visible {
      display: none;
    }

    user-select: none;
    position: absolute;
    color: white;
    bottom: -10px;
    right: 0px;
    width: max-content;
  }
`;