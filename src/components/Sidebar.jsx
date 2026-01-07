import { Layout, Menu } from "antd";
import { UserOutlined, TableOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider collapsible>
      <div style={{ height: 48, margin: 16, color: "#fff" }}>
        Dashboard
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: "/users",
            icon: <UserOutlined />,
            label: "Users",
          },
          {
            key: "/spreadsheet",
            icon: <TableOutlined />,
            label: "Spreadsheet",
          },
        ]}
      />
    </Sider>
  );
}
