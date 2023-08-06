import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
  ArrowDropDownOutlined,
  Search,
} from "@mui/icons-material";

import profileImage from "../assets/profile.jpeg";
import { useAppDispatch } from "../redux/hooks";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import { toggleMode } from "../redux/global/globalSlice";
import { FC, useState } from "react";
import User from "../infrastructure/dtos/User";

interface NavbarProps {
  isSideBarOpen: boolean;
  makeSideBarOpen: (isOpen: boolean) => void;
  user?: User;
}

const Navbar: FC<NavbarProps> = ({ isSideBarOpen, makeSideBarOpen, user }) => {
  const dispach = useAppDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement>();
  const isOpen = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(undefined);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBetween>
          <IconButton onClick={() => makeSideBarOpen(!isSideBarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            bgcolor={theme.palette.background.alt}
            borderRadius={9}
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispach(toggleMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: 25 }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: 25 }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: 25 }} />
          </IconButton>
          {user && (
            <FlexBetween>
              <Button
                onClick={handleClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  width={32}
                  height={32}
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{
                      color: theme.palette.secondary[100],
                    }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{
                      color: theme.palette.secondary[200],
                    }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: 25 }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
            </FlexBetween>
          )}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
