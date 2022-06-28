import { Box } from "@mui/system";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Typography, SxProps, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";

export interface LogoStyles {
  container: SxProps;
  icon: SxProps;
}

interface ContainerChildProps {
  isOnDashboard: boolean;
}

export default function Logo() {
  const location = useLocation();
  const isInDashboard =
    location.pathname !== "/" && location.pathname !== "/login";

  console.log(isInDashboard);
  return (
    <LogoContainer isOnDashboard={isInDashboard}>
      <IconButton sx={{ p: 0 }}>
        <StyledIcon color="primary" isOnDashboard={isInDashboard} />
      </IconButton>
      <Typography
        variant={isInDashboard ? "h1" : "h2"}
        component="h1"
        sx={isInDashboard ? { fontSize: "24px" } : undefined}
      >
        TodoIt
      </Typography>
    </LogoContainer>
  );
}

const LogoContainer = styled(Box)`
  box-sizing: border-box;
  ${({ isOnDashboard }: ContainerChildProps) =>
    isOnDashboard ? "padding: 20px 0" : "margin-bottom: 50px"};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledIcon = styled(CheckCircleRoundedIcon)`
  ${({ isOnDashboard }: ContainerChildProps) =>
    isOnDashboard ? "font-size: 35px" : "font-size: 45px"};
`;
