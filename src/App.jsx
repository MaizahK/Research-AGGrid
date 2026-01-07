import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Users from "./pages/Users";
import Spreadsheet from "./pages/Spreadsheet";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<Users />} />
        <Route path="/spreadsheet" element={<Spreadsheet />} />
      </Routes>
    </AppLayout>
  );
}
