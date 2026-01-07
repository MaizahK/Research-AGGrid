import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const { Content } = Layout;

export default function AppLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Navbar />
        <Content style={{ margin: "16px", padding: 16 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
