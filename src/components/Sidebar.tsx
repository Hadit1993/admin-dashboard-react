import { FC, useMemo } from "react";
import profileImage from "../assets/profile.jpeg";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import {
  AdminPanelSettingsOutlined,
  CalendarViewMonthOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  Groups2Outlined,
  HomeOutlined,
  PieChartOutlined,
  PointOfSaleOutlined,
  PublicOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
  ShoppingCartOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import User from "../infrastructure/dtos/User";

interface SidebarProps {
  isNoneMobile: boolean;
  drawerWidth: number | string;
  isSideBarOpen: boolean;
  makeSideBarOpen: (isOpen: boolean) => void;
  user?: User;
}

const navItems: { text: string; icon?: JSX.Element }[] = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarViewMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar: FC<SidebarProps> = ({
  isNoneMobile,
  drawerWidth,
  isSideBarOpen,
  makeSideBarOpen,
  user,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const active = useMemo(() => pathname.substring(1), [pathname]);

  return (
    <Box component="nav">
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => makeSideBarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNoneMobile ? 0 : 2,
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    ECOMVISION
                  </Typography>
                </Box>
                {!isNoneMobile && (
                  <IconButton onClick={() => makeSideBarOpen(!isSideBarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon)
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );

                const lctext = text.toLowerCase();
                const activeColor =
                  active === lctext
                    ? theme.palette.primary[600]
                    : theme.palette.secondary[100];
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => navigate(`/${lctext}`)}
                      sx={{
                        backgroundColor:
                          active === lctext
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color: activeColor,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lctext
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lctext && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          {user && (
            <Box position="absolute" bottom="2rem">
              <Divider />
              <FlexBetween
                textTransform="none"
                gap="1rem"
                m="1.5rem 2rem 0 3rem"
              >
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  width={40}
                  height={40}
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{
                      color: theme.palette.secondary[100],
                    }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{
                      color: theme.palette.secondary[200],
                    }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
                <SettingsOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: 25 }}
                />
              </FlexBetween>
            </Box>
          )}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
