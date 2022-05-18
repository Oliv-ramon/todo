import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  SxProps,
  Theme,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface PasswordInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  sx: SxProps<Theme> | undefined;
}

function PasswordInput({
  name,
  sx,
  placeholder,
  value,
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [iconColor, setIconColor] = useState<"primary" | "inherit">("inherit");

  function toggleIconColor() {
    if (iconColor === "inherit") return setIconColor("primary");

    setIconColor("inherit");
  }

  function handleIconClick() {
    setShowPassword(!showPassword);
  }

  return (
    <FormControl sx={sx} variant="standard">
      <OutlinedInput
        id={name}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        onFocus={toggleIconColor}
        onBlur={toggleIconColor}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <IconButton sx={{ p: 0 }}>
              <LockRoundedIcon color={iconColor} />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleIconClick}
              onMouseDown={handleIconClick}
              sx={{ p: 0 }}
            >
              {showPassword ? (
                <Visibility color={iconColor} />
              ) : (
                <VisibilityOff color={iconColor} />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default PasswordInput;
