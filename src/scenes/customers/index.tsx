import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "../../redux/global/globalApi";
import Header from "../../components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import User from "../../infrastructure/dtos/User";

const Customers = () => {
  const theme = useTheme();
  const { isLoading, data } = useGetCustomersQuery();
  const columns: GridColDef<User>[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) =>
        params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3"),
    },
    { field: "country", headerName: "Country", flex: 0.4 },
    { field: "occupation", headerName: "Occupation", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.5 },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualscroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          rows={data ?? []}
          columns={columns}
          getRowId={(row) => row.id}
        />
      </Box>
    </Box>
  );
};

export default Customers;
