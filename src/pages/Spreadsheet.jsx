import { useMemo, useRef, useState } from "react";
import { Card, Button, Space, message } from "antd";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  CsvExportModule,
  RowSelectionModule,
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { useTheme } from "../context/ThemeContext";

/* ✅ ag-Grid v35 Community edition modules */
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowSelectionModule,
  CsvExportModule,
]);

export default function Spreadsheet() {
  const { darkMode } = useTheme();
  const gridRef = useRef(null);

  const [rowData, setRowData] = useState([
    { id: 1, name: "John", a: 10, b: 20 },
    { id: 2, name: "Jane", a: 5, b: 15 },
  ]);

  const [editingRowId, setEditingRowId] = useState(null);
  const originalRowRef = useRef(null);

  const columnDefs = useMemo(
    () => [
      {
        field: "name",
        editable: (p) => p.data.id === editingRowId,
      },
      {
        field: "a",
        editable: (p) => p.data.id === editingRowId,
        valueParser: (p) => Number(p.newValue),
      },
      {
        field: "b",
        editable: (p) => p.data.id === editingRowId,
        valueParser: (p) => Number(p.newValue),
      },
      {
        headerName: "A + B",
        valueGetter: (p) => (p.data?.a || 0) + (p.data?.b || 0),
      },
    ],
    [editingRowId]
  );

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      resizable: true,
      sortable: true,
      filter: true,
    }),
    []
  );

  /* =========================
     Edit flow
     ========================= */

  const startEdit = () => {
    const selected = gridRef.current.api.getSelectedRows();
    if (!selected || !selected.length) {
      message.warning("Select a row first");
      return;
    }
    originalRowRef.current = { ...selected[0] };
    setEditingRowId(selected[0].id);
  };

  const saveEdit = () => {
    setEditingRowId(null);
    originalRowRef.current = null;
    message.success("Row saved");
  };

  const cancelEdit = () => {
    if (!originalRowRef.current) return;

    setRowData((prev) =>
      prev.map((row) =>
        row.id === originalRowRef.current.id
          ? originalRowRef.current
          : row
      )
    );

    setEditingRowId(null);
    message.info("Edit cancelled");
  };

  /* =========================
     Row actions
     ========================= */

  const addRow = () => {
    setRowData((prev) => [
      ...prev,
      { id: Date.now(), name: "", a: 0, b: 0 },
    ]);
  };

  const deleteRow = () => {
    const selected = gridRef.current.api.getSelectedRows();
    if (!selected || !selected.length) {
      message.warning("Select a row to delete");
      return;
    }

    setRowData((prev) =>
      prev.filter((row) => row.id !== selected[0].id)
    );
  };

  /* =========================
     Undo / Redo
     ========================= */

  const undo = () => gridRef.current.api.undoCellEditing();
  const redo = () => gridRef.current.api.redoCellEditing();

  /* =========================
     Export
     ========================= */

  const exportCSV = () =>
    gridRef.current.api.exportDataAsCsv();

  return (
    <Card
      title="Spreadsheet"
      extra={
        <Space>
          <Button onClick={addRow}>Add Row</Button>
          <Button danger onClick={deleteRow}>Delete</Button>
          <Button onClick={startEdit} disabled={editingRowId !== null}>
            Edit
          </Button>
          <Button
            type="primary"
            onClick={saveEdit}
            disabled={editingRowId === null}
          >
            Save
          </Button>
          <Button
            onClick={cancelEdit}
            disabled={editingRowId === null}
          >
            Cancel
          </Button>
          <Button onClick={undo}>Undo</Button>
          <Button onClick={redo}>Redo</Button>
          <Button onClick={exportCSV}>Export CSV</Button>
        </Space>
      }
    >
      <div
        className={darkMode ? "ag-theme-alpine-dark" : "ag-theme-alpine"}
        style={{ height: 450, width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}

          /* Selection */
          rowSelection="single"

          /* Editing */
          singleClickEdit
          stopEditingWhenCellsLoseFocus

          /* Undo / Redo */
          undoRedoCellEditing
          undoRedoCellEditingLimit={50}
        />
      </div>
    </Card>
  );
}
