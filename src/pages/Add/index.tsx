import { Box, IconButton, ToggleButton, Typography } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import Input from "../../components/Input";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState } from "react";
import { Category } from "../../services/api";
import { getWeekDays } from "../../utils/addPageUtils";
import { useNavigate } from "react-router-dom";
import AddCategoryDrawer from "./AddCategory";

export default function AddTask() {
  const [taskName, setTaskName] = useState("");
  const [weekDays, setWeekDays] = useState(getWeekDays());
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[] | []>([
    { id: 1, name: "Trabalho", color: "#546", selected: false },
  ]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskName(e.target.value);
  }

  function handleToggle(id: number) {
    const dayId = id;
    const newArr = [...weekDays];
    newArr[dayId] = { ...newArr[dayId], selected: !weekDays[dayId].selected };
    setWeekDays(newArr);
  }

  function handleCategoryClick(categoryId: number) {
    console.log(categoryId);
    const newArr = [...categories];
    console.log(newArr[categoryId]);
    newArr[categoryId] = {
      ...newArr[categoryId],
      selected: !categories[categoryId].selected,
    };
    setCategories(newArr);
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <Typography component="h2" variant="h2">
        Crie uma nova tarefa!
      </Typography>
      <Input
        name="name"
        placeholder="Nome da terefa"
        type="text"
        Icon={AssignmentIcon}
        sx={{ width: "100%" }}
        value={taskName}
        onChange={handleChange}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography component="h2" variant="h2">
          Repetir
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background: "none",
          }}
        >
          {weekDays.map((day, id) => (
            <ToggleButton
              key={id}
              id={id.toString()}
              value={day.name[0]}
              selected={day.selected}
              onChange={() => handleToggle(id)}
              color="primary"
            >
              {day.name[0]}
            </ToggleButton>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography component="h2" variant="h2">
          Categorias
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "space-between",
            background: "none",
          }}
        >
          {categories.map(({ id, name, color, selected }) => (
            <Box
              key={id}
              sx={{
                p: "5px 10px",
                borderRadius: "10px",
                backgroundColor: !selected ? color : "",
                color: !selected ? "" : color,
                fontSize: "14px",
              }}
              onClick={() => handleCategoryClick(id - 1)}
            >
              {name.toUpperCase()}
            </Box>
          ))}
          <IconButton onClick={() => setOpen(true)} sx={{ p: 0 }}>
            <AddBoxRoundedIcon sx={{ fontSize: "31px", p: 0 }} />
          </IconButton>
        </Box>
        <AddCategoryDrawer
          open={open}
          setOpen={setOpen}
          categories={categories}
        />
      </Box>
    </Box>
  );
}
