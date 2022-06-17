import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import Task from "../Task";
import { getIcon } from "../../../../utils/todayPageUtils";
import styled from "@emotion/styled";
import { useState } from "react";
import useTasks from "../../../../hooks/api/useTasks";

interface Props {
  id: number;
  name: string;
  icon: string;
  color: string;
  userId: number;
}

export default function Category({ id, name, icon, color, userId }: Props) {
  const [expanded, setExpanded] = useState<boolean | undefined>(false);
  const { tasks, tasksLoading, getTasksByCategoryId } = useTasks();
  const Icon = getIcon(icon);

  async function handleChange(
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) {
    if (!newExpanded) {
      return setExpanded(false);
    }

    if (tasks === null) await getTasksByCategoryId(id);
    setExpanded(true);
  }

  return (
    <Paper sx={{ backgroundColor: "#333" }} elevation={4}>
      <Box sx={{ p: "0" }} component="ul">
        <Accordion
          onChange={handleChange}
          expanded={expanded}
          sx={{ backgroundColor: "#312f2f", flexGrow: 1 }}
        >
          <CategoryLabel
            expandIcon={
              tasksLoading ? (
                <CircularProgress sx={{ color }} size={16} />
              ) : (
                <ExpandMoreIcon sx={{ color }} />
              )
            }
          >
            <Icon sx={{ color }} />
            <Typography sx={{ pl: "10px" }}>{name}</Typography>
            <CategoryOptionsBox onClick={(e) => e.stopPropagation()}>
              <MoreHorizIcon sx={{ color }} />
            </CategoryOptionsBox>
          </CategoryLabel>
          <AccordionDetails
            sx={{
              backgroundColor: "#1b1b1b",
              borderRadius: "0 0 10px 10px",
              p: "8px 16px 16px 0px",
            }}
          >
            {tasks?.map((task) => (
              <Task categoryColor={color} {...task} />
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
}

const CategoryLabel = styled(AccordionSummary)`
  display: flex;
`;

const CategoryOptionsBox = styled(Box)`
  margin-left: auto;
  margin-right: 8px;
  width: 24px;

  display: flex;
  gap: 8px;
`;
