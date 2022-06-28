import {
  Box,
  Checkbox,
  Drawer as MUIDrawer,
  IconButton,
  SxProps,
  ToggleButton,
  Typography,
} from "@mui/material";
import CheckedIcon from "@mui/icons-material/CheckCircleRounded";
import UncheckedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import BackIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import Input from "../../../Input";
import AssignmentIcon from "@mui/icons-material/Assignment";
import React, { useState } from "react";
import { getColors, getIcons } from "../../../../utils/addPageUtils";
import api, { Category } from "../../../../services/api";
import useAlert from "../../../../hooks/useAlert";
import Alert from "../../../Alert";
import useAuth from "../../../../hooks/useAuth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";
import { StyledButton } from "../../..";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Category[];
  getCategories: (...args: any) => Promise<any>;
}

export default function AddCategoryDrawer({
  open,
  setOpen,
  categories,
  getCategories,
}: Props) {
  const [categoryData, setCategoryData] = useState({
    name: "",
    color: "",
    icon: "",
  });
  const [loading, setLoading] = useState(false);
  const { setMessage } = useAlert();
  const { auth } = useAuth();
  const colors = getColors();
  const icons = getIcons();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCategoryData({
      ...categoryData,
      name: e.target.value,
    });
  }
  function handleCheckboxChange(
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    if (!checked) {
      return setCategoryData({
        ...categoryData,
        color: "",
      });
    }
    setCategoryData({
      ...categoryData,
      color: e.target.value,
    });
  }

  function handleTBChange(e: React.MouseEvent<HTMLElement, MouseEvent> | any) {
    if (e.currentTarget.value === categoryData.icon) {
      return setCategoryData({
        ...categoryData,
        icon: "",
      });
    }

    setCategoryData({
      ...categoryData,
      icon: e.currentTarget.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const isDuplicatedCategory = categories?.some(
      (c) => c.name.toUpperCase() === categoryData.name.toUpperCase()
    );

    if (isDuplicatedCategory) {
      setLoading(false);
      return setMessage({ text: "Essa categoria já existe.", type: "error" });
    }

    try {
      await api.createCategory(categoryData, auth?.token as string);
      setMessage({ text: "Categoria criada com sucesso!", type: "success" });
      setTimeout(() => {
        setOpen(false);
        setCategoryData({ name: "", color: "", icon: "" });
      }, 5000);
      await getCategories();
    } catch (error: Error | AxiosError | any) {
      console.log(error);
      setMessage({
        text: "Houve um erro ao criar a categoria.",
        type: "error",
      });
    }
    setLoading(false);
  }

  return (
    <MUIDrawer
      sx={{ background: "none" }}
      anchor="bottom"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        <Alert />
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: "absolute", top: "0px", left: "0px" }}
        >
          <BackIcon />
        </IconButton>
        <Typography component="h2" variant="h2">
          Crie uma nova categoria!
        </Typography>
        <Input
          name="name"
          placeholder="Nome da categoria"
          type="text"
          Icon={AssignmentIcon}
          sx={{ width: "100%" }}
          value={categoryData.name}
          onChange={handleInputChange}
        />
        <Typography variant="h2">Escolha uma cor</Typography>
        <Box sx={{ border: "1px solid #333", borderRadius: "10px" }}>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
            {colors.map((color, id) => (
              <Checkbox
                key={color}
                checked={categoryData.color === colors[id]}
                onChange={handleCheckboxChange}
                value={color}
                sx={{
                  p: "16px",
                  color,
                  "&.Mui-checked": { color },
                }}
                icon={<UncheckedIcon sx={{ fontSize: "26px" }} />}
                checkedIcon={<CheckedIcon sx={{ fontSize: "26px" }} />}
                inputProps={{ name: "color" }}
              />
            ))}
          </Box>
        </Box>
        <Typography variant="h2">Escolha um ícone</Typography>
        <Box sx={styles.toggleButtonsContainer}>
          {icons.map((Icon, id) => (
            <ToggleButton
              key={id}
              value={Icon.type.render.displayName}
              name="icon"
              selected={Icon.type.render.displayName === categoryData.icon}
              onChange={handleTBChange}
              color="primary"
            >
              {<Icon />}
            </ToggleButton>
          ))}
        </Box>
        <StyledButton
          loading={loading}
          loadingText="CREATING..."
          fields={categoryData}
        >
          CREATE CATEGORY
        </StyledButton>
      </Box>
    </MUIDrawer>
  );
}

interface AddCategoryDrawaerStyles {
  form: SxProps;
  toggleButtonsContainer: SxProps;
}

const styles: AddCategoryDrawaerStyles = {
  form: {
    p: "40px 20px",
    borderRadius: "10px 10px 0 0",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    background:
      "linear-gradient(rgba(11,70,1,1) 0%, rgba(9,45,1,1) 12%, rgba(6,28,1,1) 25%, rgba(1,8,1,1) 60%, rgba(0,5,0,1) 100%)",
    position: "relative",
  },
  toggleButtonsContainer: {
    p: "20px",
    border: "1px solid #333",
    borderRadius: "10px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "10px",
  },
};
