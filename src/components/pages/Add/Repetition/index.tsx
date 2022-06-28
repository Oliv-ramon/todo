import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
  Typography,
} from "@mui/material";

import { WeekDay } from "../../../../services/api";
import { getTimes, getWeekDays } from "../../../../utils/addPageUtils";
import { useTheme } from "@emotion/react";

interface Props {
  selectedWeekDays: [] | WeekDay[];
  setSelectedWeekDays: React.Dispatch<React.SetStateAction<[] | WeekDay[]>>;
  times: string;
  setTimes: React.Dispatch<React.SetStateAction<string>>;
}

export default function Repetition({
  selectedWeekDays,
  setSelectedWeekDays,
  times,
  setTimes,
}: Props) {
  const weekDays = getWeekDays();
  const theme = useTheme();

  function handleSelectedDaysChange(
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    day: any
  ) {
    const dayIsSelected = selectedWeekDays.some((d) => d.name === day.name);

    if (dayIsSelected) {
      setSelectedWeekDays([
        ...selectedWeekDays.filter((d) => d.name !== day.name),
      ]);
    } else {
      setSelectedWeekDays([...selectedWeekDays, day]);
    }
  }

  function handleTimesChange(event: SelectChangeEvent<string>) {
    setTimes(event.target.value);
  }

  return (
    <>
      <Typography component="h2" variant="h2">
        Repeat
      </Typography>
      <ButtonsContainer>
        {weekDays.map((day, id) => (
          <ToggleButton
            key={id}
            id={id.toString()}
            value={day}
            selected={selectedWeekDays.some((d) => d.name === day.name)}
            onChange={handleSelectedDaysChange}
            color="primary"
            sx={{ width: "38.5px" }}
          >
            {day.name[0]}
          </ToggleButton>
        ))}
      </ButtonsContainer>
      <FormControl fullWidth>
        <InputLabel sx={{ color: "white" }}>Times</InputLabel>
        <Select
          value={times}
          label="Times"
          onChange={handleTimesChange}
          MenuProps={{
            PaperProps: {
              style: { maxHeight: "200px", backgroundColor: "#121212" },
            },
          }}
        >
          {getTimes().map((t) => (
            <StyledMenuItem key={t.value} theme={theme} value={t.value}>
              {t.text}
            </StyledMenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

const ButtonsContainer = styled(Box)`
  padding: 20px;

  display: flex;
  justify-content: space-between;

  border: 1px solid #333;
  border-radius: 10px;
`;

const StyledMenuItem = styled(MenuItem)`
  ${({ selected, theme }: any) =>
    selected && `color: ${theme.palette.primary.main}`}
`;
