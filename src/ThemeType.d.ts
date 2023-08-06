import { ThemeSettings } from "./theme";

declare module "@mui/material/styles" {
  interface Theme {
    palette: ThemeSettings["palette"];
    typography: ThemeSettings["typography"];
  }

  interface ThemeOptions {
    palette?: Partial<ThemeSettings["palette"]>;
    typography?: Partial<ThemeSettings["typography"]>;
  }
}
