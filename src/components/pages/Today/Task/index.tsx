import CheckedIcon from "@mui/icons-material/CheckCircleRounded";
import UncheckedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { Box, Checkbox, Typography } from "@mui/material";
import { ChangeEvent } from "react";

import { Task as TaskType } from "../../../../services/api";
import useUpdateTasks from "../../../../hooks/api/useUpdateTasks";

type Props = TaskType & {
  categoryId?: number;
  color?: string;
  reloadTasks?: () => Promise<void>;
  readonly?: boolean;
};

export default function Task({
  id,
  name,
  color,
  checked,
  reloadTasks,
  readonly,
}: Props) {
  const { updateTask } = useUpdateTasks();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;

    await updateTask(id, { checked: isChecked });
    reloadTasks && (await reloadTasks());
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
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
