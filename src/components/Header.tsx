import { Box, Typography, useTheme } from "@mui/material";
import { FC } from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: FC<HeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{
          mb: 5,
        }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
