import {
  AirplanemodeActiveRounded,
  HomeRounded,
  LibraryBooksRounded,
  PhoneInTalkRounded,
  WorkRounded,
} from "@mui/icons-material";
import {
  amber,
  deepPurple,
  lightBlue,
  lightGreen,
  pink,
  red,
} from "@mui/material/colors";

export function getColors() {
  return [
    red["A700"],
    pink["A700"],
    deepPurple["A700"],
    lightBlue["A700"],
    lightGreen["A700"],
    amber["800"],
  ];
}

export function getIcons(): any[] {
  return [
    WorkRounded,
    HomeRounded,
    AirplanemodeActiveRounded,
    LibraryBooksRounded,
    PhoneInTalkRounded,
  ];
}
