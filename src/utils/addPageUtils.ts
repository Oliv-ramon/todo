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

export function getWeekDays() {
  return [
    { id: 0, name: "sunday" },
    { id: 1, name: "monday" },
    { id: 2, name: "thursday" },
    { id: 3, name: "wednesday" },
    { id: 4, name: "thirsday" },
    { id: 5, name: "friday" },
    { id: 6, name: "saturday" },
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

export function getTimes() {
  return [
    { value: 1, text: "One" },
    { value: 3, text: "Three" },
    { value: 5, text: "Five" },
    { value: 7, text: "Seven" },
    { value: 10, text: "Ten" },
  ];
}
