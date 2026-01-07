import { Table, Card } from "antd";

const dataSource = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const columns = [
  { title: "ID", dataIndex: "id" },
  { title: "Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
];

export default function Users() {
  return (
    <Card title="All Users">
      <Table
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </Card>
  );
}
