import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  SvgIconTypeMap,
  SxProps,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useState } from "react";

type MUIIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};

interface InputProps {
  name: string;
  placeholder: string;
  type: "email" | "text";
  sx: SxProps;
  value: string | null;
  Icon: MUIIcon;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  name,
  placeholder,
  type,
  Icon,
  sx,
  value,
  onChange: handleChange,
}: InputProps) {
  const [iconColor, setIconColor] = useState<"primary" | "inherit">("inherit");

  function toggleIconColor() {
    if (iconColor === "inherit") return setIconColor("primary");

    setIconColor("inherit");
  }

  return (
    <FormControl sx={sx} variant="outlined">
      <OutlinedInput
        name={name}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={handleChange}
        onFocus={toggleIconColor}
        onBlur={toggleIconColor}
        autoComplete="off"
        startAdornment={
          <InputAdornment position="start">
            <Icon color={iconColor} />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
