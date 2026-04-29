import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { PaginationRoot, Pagination, PaginationPrev, PaginationNext, PaginationItem, PaginationEllipsis } from "./Pagination";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div className="space-y-4">
        <p className="text-body-sm font-bold">Current page: {page}</p>
        <PaginationRoot page={page} totalPages={10} onPageChange={setPage} />
      </div>
    );
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <PaginationRoot page={page} totalPages={5} onPageChange={setPage} />;
  },
};

export const Manual: Story = {
  render: () => (
    <Pagination>
      <PaginationPrev />
      <PaginationItem>1</PaginationItem>
      <PaginationItem active>2</PaginationItem>
      <PaginationItem>3</PaginationItem>
      <PaginationEllipsis />
      <PaginationItem>10</PaginationItem>
      <PaginationNext />
    </Pagination>
  ),
};
