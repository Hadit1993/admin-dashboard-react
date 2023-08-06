import { useMemo } from "react";
import { useAppSelector } from "./redux/hooks";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import ProductsPage from "./scenes/products";
import Customers from "./scenes/customers";
import TransactionsPage from "./scenes/transactions";

function App() {
  const { mode } = useAppSelector((state) => state.global);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<TransactionsPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
