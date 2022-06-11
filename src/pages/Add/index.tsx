import { Box, IconButton, ToggleButton, Typography } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { AxiosError } from "axios";
import { useState } from "react";

import Input from "../../components/Input";
import AddCategoryDrawer from "../../components/Add/AddCategoryDrawer";
import SelectCategoryButton from "../../components/Add/SelectCategoryButton";
import useAlert from "../../hooks/useAlert";
import api, { Category, WeekDay } from "../../services/api";
import useDays from "../../hooks/api/useWeekDays";
import useCategories from "../../hooks/api/useCategories";

export default function AddTask() {
  const [taskName, setTaskName] = useState("");
  const [selectedWeekDays, setSelectedWeekDays] = useState<WeekDay[] | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const { weekDays, weekDaysLoading } = useDays();
  const { categories, categoriesLoading } = useCategories();
  const { setMessage } = useAlert();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskName(e.target.value);
  }

  function handleWeekDaySelection(day: WeekDay) {
    const dayIsSelected = selectedWeekDays.some((d) => d.name === day.name);

    if (dayIsSelected) {
      setSelectedWeekDays([
        ...selectedWeekDays.filter((d) => d.name !== day.name),
      ]);
    } else {
      setSelectedWeekDays([...selectedWeekDays, day]);
    }
  }

  function handleCategoryClick(category: Category) {
    console.log(selectedCategory);
    if (category.id === selectedCategory?.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  }

  /* async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    if (!taskName || !selectedCategory || !selectedWeekDay) {
      setMessage({
        text: "Todos os campos precisam ser preenchidos.",
        type: "error",
      });
      return setLoading(false);
    }

    try {
      await api.signIn(formData);
      setLoading(false);
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        const errorMessage = mapLoginErrorMessages(error.code);
        setMessage({
          type: "error",
          text: errorMessage,
        });
        return setLoading(false);
      }
    }
  } */

  return (
    <Box
      component="form"
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
          {!weekDaysLoading &&
            (weekDays as unknown as WeekDay[]).map((day, id) => (
              <ToggleButton
                key={id}
                id={id.toString()}
                value={day.name[0]}
                selected={selectedWeekDays.some((d) => d.name === day.name)}
                onChange={() => handleWeekDaySelection(day)}
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
          {!categoriesLoading &&
            (categories as unknown as Category[]).map((category) => (
              <SelectCategoryButton
                category={category}
                selected={category.id === selectedCategory?.id}
                onClick={handleCategoryClick}
              />
            ))}
          <IconButton onClick={() => setOpen(true)} sx={{ p: 0 }}>
            <AddBoxRoundedIcon sx={{ fontSize: "31px", p: 0 }} />
          </IconButton>
        </Box>
        <AddCategoryDrawer
          open={open}
          setOpen={setOpen}
          categories={categories as unknown as Category[]}
        />
      </Box>
    </Box>
  );
}
