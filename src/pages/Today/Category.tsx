import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import CheckedIcon from "@mui/icons-material/CheckCircleRounded";
import UncheckedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Paper,
  Typography,
} from "@mui/material";
export default function Category() {
  return (
    <Paper sx={{ backgroundColor: "#333" }} elevation={4}>
      <Box sx={{ p: "0" }} component="ul">
        <Accordion sx={{ backgroundColor: "#312f2f", flexGrow: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "red" }} />}
          >
            <WorkOutlineRoundedIcon sx={{ color: "red" }} />
            <Typography sx={{ pl: "10px" }}>Trabalho</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "#1b1b1b",
              borderRadius: "0 0 10px 10px",
              p: "8px 16px 16px 0px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                sx={{
                  p: "16px",
                  color: "red",
                  "&.Mui-checked": { color: "red" },
                }}
                icon={<UncheckedIcon sx={{ color: "red", fontSize: "26px" }} />}
                checkedIcon={
                  <CheckedIcon sx={{ color: "red", fontSize: "26px" }} />
                }
              />
              <Typography
                sx={{
                  color: "#aaa",
                }}
              >
                Agendar entrevista com monitor
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
}
