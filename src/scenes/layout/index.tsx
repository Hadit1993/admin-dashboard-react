import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAppSelector } from "../../redux/hooks";
import { useGetUserQuery } from "../../redux/global/globalApi";

const Layout = () => {
  const isNoneMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, makeSidebarOpen] = useState(true);
  const { userId } = useAppSelector((state) => state.global);

  const { data } = useGetUserQuery(userId);

  return (
    <Box display={isNoneMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        isNoneMobile={isNoneMobile}
        drawerWidth="250px"
        isSideBarOpen={isSidebarOpen}
        makeSideBarOpen={makeSidebarOpen}
        user={data}
      />
      <Box flexGrow={1}>
        <Navbar
          isSideBarOpen={isSidebarOpen}
          makeSideBarOpen={makeSidebarOpen}
          user={data}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
