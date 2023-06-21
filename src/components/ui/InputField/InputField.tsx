import React, { useState } from "react";
import type { IconType } from "react-icons";
import './InputField.css'
type Props = {
  title: string;
  id: string;
  type: string;
  value: string;
  setData: React.Dispatch<React.SetStateAction<any>>;
  placeHolder: string;
  Icon: IconType;
  data: any,
  disabled: boolean
};

export default function InputField({ title, id, type,setData, value, placeHolder, Icon, data, disabled}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="input-main-container">
      <p className="input-title">{title}</p>
      <div
      className="input-box"
        style={{
          borderBottom: `${isFocused ? "2px solid red" : "2px solid #707070"}`, color: `${isFocused ? '#6F11F5': '#707070'}`
        }}
      >
        <Icon style={{ fontSize: "1.3rem" }} />
        <input
          className="input-field"
          type={type}
          id={id}
          value={value}
          onChange={(e) => setData({...data, [e.target.id]: e.target.value})}
          placeholder={placeHolder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
