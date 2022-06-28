import CheckedIcon from "@mui/icons-material/CheckCircleRounded";
import UncheckedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { Box, Checkbox, Typography } from "@mui/material";
import { ChangeEvent } from "react";

import { Task as TaskType } from "../../../../services/api";
import useCheckTask from "../../../../hooks/api/useCheckTask";

type Props = TaskType & {
  reloadTasks?: () => Promise<void>;
  readonly?: boolean;
};

export default function Task({
  id,
  name,
  category: { color },
  events: [{ id: eventId, checked }],
  reloadTasks,
  readonly,
}: Props) {
  const { check } = useCheckTask();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    await check(eventId);
    reloadTasks && (await reloadTasks());
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Checkbox
        onChange={handleChange}
        sx={{
          p: "16px",
          color,
          "&.Mui-checked": { color },
        }}
        icon={<UncheckedIcon sx={{ color, fontSize: "26px" }} />}
        checkedIcon={<CheckedIcon sx={{ color, fontSize: "26px" }} />}
        checked={checked}
        disabled={readonly}
      />
      <Typography>{name}</Typography>
    </Box>
  );
}
