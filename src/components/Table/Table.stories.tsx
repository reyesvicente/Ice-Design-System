import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./Table";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Brutalist data table. Monospace for tabular data, black header bar, hard 2px row borders, yellow hover tint. No zebra striping — row borders carry the rhythm.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const clients = [
  { client: "rev6.fit", project: "Member portal", status: "active", mrr: 1800, deploy: "2h ago" },
  { client: "GERTC", project: "Moodle LMS", status: "active", mrr: 700, deploy: "3d ago" },
  { client: "Acme Corp", project: "Landing rebuild", status: "shipped", mrr: 0, deploy: "1w ago" },
  { client: "Nova Labs", project: "Shopify migration", status: "pending", mrr: 0, deploy: "—" },
  { client: "Helix Studio", project: "Internal dashboard", status: "active", mrr: 1200, deploy: "5h ago" },
  { client: "Bright AI", project: "API integration", status: "failed", mrr: 0, deploy: "1h ago" },
];

const statusVariant = (s: string) => {
  switch (s) {
    case "active":
      return "success" as const;
    case "shipped":
      return "primary" as const;
    case "pending":
      return "warning" as const;
    case "failed":
      return "error" as const;
    default:
      return "default" as const;
  }
};

export const Default: Story = {
  render: () => (
    <div className="max-w-4xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">MRR</TableHead>
            <TableHead>Last deploy</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((c) => (
            <TableRow key={c.client}>
              <TableCell className="font-semibold">{c.client}</TableCell>
              <TableCell>{c.project}</TableCell>
              <TableCell>
                <Badge variant={statusVariant(c.status)}>{c.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                {c.mrr > 0 ? `$${c.mrr.toLocaleString()}` : "—"}
              </TableCell>
              <TableCell>{c.deploy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="max-w-5xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">MRR</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.slice(0, 4).map((c) => (
            <TableRow key={c.client}>
              <TableCell className="font-semibold">{c.client}</TableCell>
              <TableCell>{c.project}</TableCell>
              <TableCell>
                <Badge variant={statusVariant(c.status)}>{c.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                {c.mrr > 0 ? `$${c.mrr.toLocaleString()}` : "—"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="secondary">
                    View
                  </Button>
                  <Button size="sm" variant="primary">
                    Deploy
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const Compact: Story = {
  render: () => (
    <div className="max-w-3xl">
      <Table className="text-xs">
        <TableHeader>
          <TableRow>
            <TableHead className="py-2">Timestamp</TableHead>
            <TableHead className="py-2">Event</TableHead>
            <TableHead className="py-2">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            ["2026-04-24 14:32:11", "deploy.production", "success"],
            ["2026-04-24 14:28:03", "build.started", "pending"],
            ["2026-04-24 13:55:47", "webhook.received", "success"],
            ["2026-04-24 13:12:19", "payment.failed", "failed"],
            ["2026-04-24 12:04:02", "user.signup", "success"],
          ].map(([ts, event, status]) => (
            <TableRow key={ts}>
              <TableCell className="py-2 text-neo-black-700">{ts}</TableCell>
              <TableCell className="py-2">{event}</TableCell>
              <TableCell className="py-2">
                <Badge variant={statusVariant(status)}>{status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
