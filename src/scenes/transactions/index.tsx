import { useState } from "react";
import { useGetTransactionsQuery } from "../../redux/global/globalApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Transaction from "../../infrastructure/dtos/Transaction";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

const TransactionsPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [minCost, setMinCost] = useState<number>();
  const [maxCost, setMaxCost] = useState<number>();

  const theme = useTheme();

  const { isLoading, data } = useGetTransactionsQuery({
    page,
    pageSize,
    sort,
    userId,
    minCost,
    maxCost,
  });

  const columns: GridColDef<Transaction>[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "createdAt", headerName: "Created at", flex: 1 },

    {
      field: "products",
      headerName: "# of products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },

    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${params.value}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
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
          loading={isLoading ?? !!data}
          rows={data?.data ?? []}
          columns={columns}
          getRowId={(row) => row.id}
          rowCount={data?.totalElements ?? 0}
          pagination
          paginationMode="server"
          paginationModel={{ page: page - 1, pageSize }}
          sortingMode="server"
          onPaginationModelChange={(model) => {
            setPage(model.page + 1);
            setPageSize(model.pageSize);
          }}
          onSortModelChange={(sortModel) => {
            const firstSort = sortModel[0];
            setSort(`${firstSort.field}-${firstSort.sort}`);
            setPage(1);
          }}
          slots={{
            toolbar: DataGridCustomToolbar,
          }}
          slotProps={{
            toolbar: {
              onSearch: setUserId,
              onMinCostChange: setMinCost,
              onMaxCostChange: setMaxCost,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default TransactionsPage;
