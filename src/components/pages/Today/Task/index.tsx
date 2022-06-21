import CheckedIcon from "@mui/icons-material/CheckCircleRounded";
import UncheckedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { Box, Checkbox, Typography } from "@mui/material";
import { ChangeEvent } from "react";

import { Task as TaskType } from "../../../../services/api";
import useUpdateTasks from "../../../../hooks/api/useUpdateTasks";

type Props = TaskType & { categoryColor: string; reloadTasks(): Promise<void> };

export default function Task({
  id,
  name,
  categoryColor,
  checked,
  reloadTasks,
}: Props) {
  const { updateTask } = useUpdateTasks();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;

    await updateTask(id, { checked: isChecked });
    await reloadTasks();
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Checkbox
        onChange={handleChange}
        sx={{
          p: "16px",
          color: categoryColor,
          "&.Mui-checked": { color: categoryColor },
        }}
        icon={<UncheckedIcon sx={{ color: categoryColor, fontSize: "26px" }} />}
        checkedIcon={
          <CheckedIcon sx={{ color: categoryColor, fontSize: "26px" }} />
        }
        checked={checked}
      />
      <Typography>{name}</Typography>
    </Box>
  );
}
