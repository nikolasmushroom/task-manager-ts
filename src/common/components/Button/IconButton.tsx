import { Button, ButtonPropsType } from "common/components/Button/Button";
import React from "react";
import s from "common/components/Button/Button.module.css";

export const IconButton: React.FC<ButtonPropsType & { iconUrl: string }> = ({
                                                                              xType,
                                                                              iconUrl,
                                                                              className,
                                                                              disabled,
                                                                              ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
                                                                            }) => {
  const finalClassName = s.button
    + (disabled
        ? " " + s.disabled
        : xType === "red"
          ? " " + s.red
          : xType === "secondary"
            ? " " + s.secondary
            : " " + s.default
    ) + (className ? " " + className : "");
  return (
    <Button style={{
      background: "none",
      border: "none",
    }} disabled={disabled}
            className={finalClassName}
            {...restProps}>
      <img src={iconUrl} alt="icon" />
    </Button>
  );
};