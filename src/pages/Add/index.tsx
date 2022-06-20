import { Box, IconButton, ToggleButton, Typography } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import AssignmentIcon from "@mui/icons-material/Assignment";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";
import { useState } from "react";

import Input from "../../components/Input";
import AddCategoryDrawer from "../../components/pages/Add/AddCategoryDrawer";
import SelectCategoryButton from "../../components/pages/Add/SelectCategoryButton";
import useAlert from "../../hooks/useAlert";
import { Category, WeekDay } from "../../services/api";
import useDays from "../../hooks/api/useWeekDays";
import useCategories from "../../hooks/api/useCategories";
import { Alert, StyledButton } from "../../components";
import useCreateTask from "../../hooks/api/useCreateTask";
import { mapCreateTaskErrorMessages } from "../../utils/alertUtils";

export default function AddTask() {
  const [taskName, setTaskName] = useState("");
  const [selectedWeekDays, setSelectedWeekDays] = useState<WeekDay[] | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const { weekDays } = useDays();
  const { categories, categoriesLoading, getCategories } = useCategories();
  const { setMessage } = useAlert();
  const { createTask, createTaskLoading } = useCreateTask();

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
    if (category.id === selectedCategory?.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (selectedWeekDays.length === 0) {
      return setMessage({
        type: "error",
        text: "Selecione pelo menos um dia.",
      });
    }

    try {
      const taskData = {
        name: taskName,
        categoryId: selectedCategory?.id,
        days: selectedWeekDays,
      };
      await createTask(taskData);
      setMessage({
        text: "Tarefa criada com sucesso!",
        type: "success",
      });
    } catch (error: AxiosError | Error | any) {
      const errorCode = error.response.status as number;

      const errorMessage = mapCreateTaskErrorMessages(errorCode);
      setMessage({
        type: "error",
        text: errorMessage,
      });
    }
  }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
      }}
      onSubmit={handleSubmit}
    >
      <Alert />
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
          {(weekDays as unknown as WeekDay[])?.map((day, id) => (
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
          {(categories as unknown as Category[])?.map((category) => (
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
          getCategories={getCategories}
        />
      </Box>
      <StyledButton
        loading={createTaskLoading}
        loadingText="Criando"
        fields={{ taskName, selectedCategory, selectedWeekDays }}
      >
        Criar
      </StyledButton>
    </Box>
  );
}
