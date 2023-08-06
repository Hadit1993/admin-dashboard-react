import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Search, Check } from "@mui/icons-material";
import { FC, useState } from "react";

interface DataGridCustomToolbarProps {
  onSearch: (search: string | undefined) => void;
  onMinCostChange: (minCost: number | undefined) => void;
  onMaxCostChange: (maxCost: number | undefined) => void;
}

const DataGridCustomToolbar: FC<DataGridCustomToolbarProps> = ({
  onSearch,
  onMinCostChange,
  onMaxCostChange,
}) => {
  const [searchInput, setSearchInput] = useState<string>();
  const [minCost, SetMinCost] = useState<string>();
  const [maxCost, setMaxCost] = useState<string>();
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label="Min Cost"
          sx={{ width: "7.5rem", mb: "0.5rem" }}
          type="number"
          variant="standard"
          value={minCost}
          onChange={(e) => {
            SetMinCost(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    if (!minCost) onMinCostChange(undefined);
                    else onMinCostChange(Number(minCost));
                    // SetMinCost(undefined)
                  }}
                >
                  <Check />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Max Cost"
          sx={{ width: "7.5rem", mb: "0.5rem" }}
          type="number"
          variant="standard"
          value={maxCost}
          onChange={(e) => {
            setMaxCost(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    if (!maxCost) onMaxCostChange(undefined);
                    else onMaxCostChange(Number(maxCost));
                    // setMaxCost(undefined)
                  }}
                >
                  <Check />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Search User IDs..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    onSearch(searchInput);
                    setSearchInput(undefined);
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
