import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './Button.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement>

export type ButtonPropsType = DefaultButtonPropsType & {
  xType?: string
}

export const Button: React.FC<ButtonPropsType> = (
  {
    xType,
    className,
    disabled,
    ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
  }
) => {
  const finalClassName = s.button
    + (disabled
        ? " " + s.disabled
        : xType === 'red'
          ? " " + s.red
          : xType === 'secondary'
            ? " " + s.secondary
            : " " + s.default
    ) + (className ? ' ' + className : '')
  // задачка на смешивание классов

  return (
    <button
      disabled={disabled}
      className={finalClassName}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  )
}
