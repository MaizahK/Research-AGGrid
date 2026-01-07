import { Layout, Switch } from "antd";
import { useTheme } from "../context/ThemeContext";

const { Header } = Layout;

export default function Navbar() {
  const { dark, toggleTheme } = useTheme();

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingInline: 24,
      }}
    >
      <span style={{ marginRight: 8, color: "white" }}>Dark Mode</span>
      <Switch checked={dark} onChange={toggleTheme} />
    </Header>
  );
}
