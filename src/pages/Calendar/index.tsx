import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Modal, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  CalendarPicker as MUICalendarPicker,
  CalendarPickerProps,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import styled from "@emotion/styled";
import dayjs, { Dayjs } from "dayjs";
import useTasks from "../../hooks/api/useTasks";
import Task from "../../components/pages/Today/Task";

export default function Calendar() {
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const [open, setOpen] = useState<boolean>(false);
  const { tasks, getTasks } = useTasks("date");

  async function handleChange(newValue: Dayjs | null) {
    setValue(newValue);
    await getTasks(newValue);
    setOpen(true);
  }

  function handleToggleModal() {
    setOpen(!open);
  }

  return (
    <Container component="main">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper elevation={12} sx={{ backgroundColor: "#333" }}>
          <CalendarPicker
            date={value}
            onChange={handleChange}
            views={["day", "month", "year"]}
            renderDay={(day, selectedDays, pickersDayProps) => (
              <StyledPickersDay
                dayIsBetween={false}
                isFirstDay={false}
                isLastDay={false}
                {...pickersDayProps}
              />
            )}
          />
        </Paper>
      </LocalizationProvider>
      <Modal component="div" open={open} onClose={handleToggleModal}>
        <ModalContainer elevation={12}>
          {tasks?.map((task) => (
            <Task
              key={task.id}
              readonly={true}
              {...task}
              color="primary.main"
            />
          ))}
        </ModalContainer>
      </Modal>
    </Container>
  );
}

const Container = styled(Box)`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarPicker = styled(MUICalendarPicker)`
  border-radius: 10px;

  background-color: #333;
  color: black;
` as React.ComponentType<CalendarPickerProps<Dayjs>>;

type CustomPickerDayProps = PickersDayProps<Dayjs> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
};

const StyledPickersDay = styled(PickersDay)`
  background-color: #1f221f;
  color: white;
` as React.ComponentType<CustomPickerDayProps>;

const ModalContainer = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  background-color: #333;
  padding: 10px;
`;
