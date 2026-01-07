import { useMemo } from "react";
import { Card } from "antd";
import { AgGridReact } from "ag-grid-react";

import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { useTheme } from "../context/ThemeContext";

// ✅ Register required modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default function Spreadsheet() {
  const { darkMode } = useTheme();

  const columnDefs = useMemo(
    () => [
      { field: "name", editable: true },
      { field: "age", editable: true },
      { field: "country", editable: true },
    ],
    []
  );

  const rowData = useMemo(
    () => [
      { name: "John", age: 25, country: "USA" },
      { name: "Jane", age: 30, country: "UK" },
    ],
    []
  );

  return (
    <Card title="Spreadsheet">
      <div
        className={darkMode ? "ag-theme-alpine-dark" : "ag-theme-alpine"}
        style={{ height: 400, width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            resizable: true,
            flex: 1,
          }}
        />
      </div>
    </Card>
  );
}
