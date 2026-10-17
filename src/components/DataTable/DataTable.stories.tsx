import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DataTable, type DataTableColumn } from "./DataTable";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  issued: Date;
}

const statusVariant = { paid: "success", pending: "warning", overdue: "error" } as const;

const clients = ["Acme Co", "Globex", "Initech", "Umbrella", "Hooli", "Stark Industries"];
const statuses: Invoice["status"][] = ["paid", "pending", "overdue"];

const invoices: Invoice[] = Array.from({ length: 23 }, (_, i) => ({
  id: `INV-${String(1001 + i)}`,
  client: clients[i % clients.length],
  amount: ((i * 7919) % 9000) + 500,
  status: statuses[i % statuses.length],
  issued: new Date(2026, i % 12, (i % 27) + 1),
}));

const columns: DataTableColumn<Invoice>[] = [
  { id: "id", header: "Invoice", accessor: (row) => row.id, sortable: true },
  { id: "client", header: "Client", accessor: (row) => row.client, sortable: true },
  {
    id: "status",
    header: "Status",
    accessor: (row) => row.status,
    cell: (row) => <Badge variant={statusVariant[row.status]}>{row.status}</Badge>,
    sortable: true,
  },
  { id: "issued", header: "Issued", accessor: (row) => row.issued, sortable: true },
  {
    id: "amount",
    header: "Amount",
    accessor: (row) => row.amount,
    cell: (row) => `$${row.amount.toLocaleString()}`,
    sortable: true,
    align: "right",
  },
];

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { data: [], columns: [], getRowId: () => "" },
  render: () => (
    <DataTable data={invoices} columns={columns} getRowId={(row) => row.id} pageSize={8} />
  ),
};

function SelectableDemo() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const filtered = invoices.filter((row) =>
    `${row.id} ${row.client}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <DataTable
      data={filtered}
      columns={columns}
      getRowId={(row) => row.id}
      pageSize={8}
      selectable
      selectedIds={selected}
      onSelectionChange={setSelected}
      defaultSort={{ columnId: "amount", direction: "desc" }}
      toolbar={
        <>
          <Input
            size="sm"
            className="max-w-xs"
            placeholder="Search invoices…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {selected.length > 0 && (
            <Button size="sm" variant="destructive" onClick={() => setSelected([])}>
              Void {selected.length}
            </Button>
          )}
        </>
      }
    />
  );
}

export const SelectableWithToolbar: Story = {
  args: { data: [], columns: [], getRowId: () => "" },
  render: () => <SelectableDemo />,
};

export const Loading: Story = {
  args: { data: [], columns: [], getRowId: () => "" },
  render: () => (
    <DataTable data={[]} columns={columns} getRowId={(row) => row.id} loading pageSize={5} />
  ),
};

export const Empty: Story = {
  args: { data: [], columns: [], getRowId: () => "" },
  render: () => (
    <DataTable
      data={[]}
      columns={columns}
      getRowId={(row) => row.id}
      emptyState="No invoices yet. Create one to get started."
    />
  ),
};
