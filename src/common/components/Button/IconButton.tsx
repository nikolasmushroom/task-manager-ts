import { Button, ButtonPropsType } from "common/components/Button/Button";
import React from "react";
import s from "common/components/Button/Button.module.css";

export const IconButton: React.FC<ButtonPropsType & {
  iconUrl: string,
  width?: string,
  height?: string,
  style?: React.CSSProperties
}> = ({
        iconUrl,
        width = "25px",
        height = "25px",
        disabled,
        style,
        ...restProps
      }) => {

  return (
    <Button style={{
      background: "none",
      border: "none"
    }} disabled={disabled}
            {...restProps}>
      <img style={{ width, height }} src={iconUrl} alt="icon" />
    </Button>
  );
};