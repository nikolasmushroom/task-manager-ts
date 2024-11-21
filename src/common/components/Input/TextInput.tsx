import React, {
  ChangeEvent,
  DetailedHTMLProps, ForwardedRef, forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode
} from "react";
import s from "./TextInput.module.css";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = Omit<DefaultInputPropsType, "type"> & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: ReactNode
  spanClassName?: string
  type?: string
}

export const TextInput = forwardRef(({
                                       onChange,
                                       onChangeText,
                                       onKeyPress,
                                       onEnter,
                                       error,
                                       className,
                                       spanClassName,
                                       id,
                                       ...restProps
                                     }: SuperInputTextPropsType, ref: ForwardedRef<HTMLInputElement>) => {

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e); // если есть пропс onChange, то передать ему е (поскольку onChange не обязателен)

    onChangeText?.(e.currentTarget.value);
  };
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress?.(e);

    onEnter && // если есть пропс onEnter
    e.key === "Enter" && // и если нажата кнопка Enter
    onEnter(); // то вызвать его
  };

  const finalSpanClassName = s.error
    + (spanClassName ? " " + spanClassName : "");
  const finalInputClassName = s.input
    + (error ? " " + s.errorInput : " " + s.superInput)
    + (className ? " " + className : ""); // задача на смешивание классов

  return (
    <div className={s.inputWrapper}>
      <div className={s.errorAndInputContainer}>
        <input
          id={id}
          type={"text"}
          onChange={onChangeCallback}
          onKeyPress={onKeyPressCallback}
          className={finalInputClassName}
          ref={ref}
          {...restProps}
        />
      </div>
      {/*<div*/}
      {/*  id={id ? id + "-span" : undefined}*/}
      {/*  className={finalSpanClassName}*/}
      {/*>*/}
      {/*  {error}*/}
      {/*</div>*/}
    </div>
  );
});