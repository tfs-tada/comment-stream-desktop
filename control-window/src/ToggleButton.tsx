import { InputHTMLAttributes } from "react";

export const ToggleButton = ({
  isOn,
  ...props
}: { isOn: boolean } & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="checkbox"
      checked={isOn}
      // toggle style
      style={{
        appearance: "none",
        width: "40px",
        height: "20px",
        borderRadius: "20px",
        background: isOn ? "lightblue" : "gray",
        position: "relative",
        cursor: "pointer",
        transition: "background-color 0.5s",
      }}
      {...props}
    />
  );
};
