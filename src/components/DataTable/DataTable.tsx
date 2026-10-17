import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { Checkbox } from "../Checkbox/Checkbox";
import { PaginationRoot } from "../Pagination/Pagination";
import { Skeleton } from "../Skeleton/Skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Table/Table";

export type DataTableSortDirection = "asc" | "desc";

export interface DataTableSort {
  columnId: string;
  direction: DataTableSortDirection;
}

type SortValue = string | number | boolean | Date | null | undefined;

export interface DataTableColumn<T> {
  id: string;
  header: React.ReactNode;
  /** Value used for sorting, and rendered when no `cell` is given. */
  accessor?: (row: T) => SortValue;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => string;
  caption?: string;
  className?: string;
  /** Rendered above the table — search inputs, filters, bulk actions. */
  toolbar?: React.ReactNode;
  emptyState?: React.ReactNode;
  loading?: boolean;
  onRowClick?: (row: T) => void;

  // Sorting
  sort?: DataTableSort | null;
  defaultSort?: DataTableSort | null;
  onSortChange?: (sort: DataTableSort | null) => void;
  /** Skip client-side sorting, e.g. when the API sorts (`?ordering=`). */
  manualSorting?: boolean;

  // Selection
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;

  // Pagination
  /** Client-side page size. Ignored when `totalPages` is set. */
  pageSize?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  /** Set for server-side pagination; `data` is then treated as the current page. */
  totalPages?: number;
}

const alignClass = { left: "text-left", center: "text-center", right: "text-right" } as const;

function compareValues(a: SortValue, b: SortValue): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}

function renderValue(value: SortValue): React.ReactNode {
  if (value == null) return "—";
  if (value instanceof Date) return value.toLocaleDateString();
  return String(value);
}

export function DataTable<T>({
  data,
  columns,
  getRowId,
  caption,
  className,
  toolbar,
  emptyState = "No results.",
  loading = false,
  onRowClick,
  sort: sortProp,
  defaultSort = null,
  onSortChange,
  manualSorting = false,
  selectable = false,
  selectedIds: selectedProp,
  onSelectionChange,
  pageSize,
  page: pageProp,
  onPageChange,
  totalPages: totalPagesProp,
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<DataTableSort | null>(defaultSort);
  const [selectedState, setSelectedState] = useState<string[]>([]);
  const [pageState, setPageState] = useState(1);

  const sort = sortProp !== undefined ? sortProp : sortState;
  const selectedIds = selectedProp ?? selectedState;
  const page = pageProp ?? pageState;
  const manualPagination = totalPagesProp !== undefined;

  const sortedData = useMemo(() => {
    if (!sort || manualSorting) return data;
    const column = columns.find((c) => c.id === sort.columnId);
    if (!column?.accessor) return data;
    const accessor = column.accessor;
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...data].sort((a, b) => compareValues(accessor(a), accessor(b)) * factor);
  }, [data, columns, sort, manualSorting]);

  const totalPages = manualPagination
    ? totalPagesProp
    : pageSize
      ? Math.max(1, Math.ceil(sortedData.length / pageSize))
      : 1;

  const rows = useMemo(() => {
    if (manualPagination || !pageSize) return sortedData;
    const start = (Math.min(page, totalPages) - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, manualPagination, pageSize, page, totalPages]);

  const changePage = (next: number) => {
    setPageState(next);
    onPageChange?.(next);
  };

  const toggleSort = (columnId: string) => {
    // Cycle: asc → desc → unsorted
    let next: DataTableSort | null;
    if (sort?.columnId !== columnId) next = { columnId, direction: "asc" };
    else if (sort.direction === "asc") next = { columnId, direction: "desc" };
    else next = null;
    setSortState(next);
    onSortChange?.(next);
    if (!manualPagination) changePage(1);
  };

  const setSelection = (next: string[]) => {
    setSelectedState(next);
    onSelectionChange?.(next);
  };

  const rowIds = rows.map(getRowId);
  const selectedOnPage = rowIds.filter((id) => selectedIds.includes(id));
  const allSelected = rowIds.length > 0 && selectedOnPage.length === rowIds.length;
  const someSelected = selectedOnPage.length > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) setSelection(selectedIds.filter((id) => !rowIds.includes(id)));
    else setSelection([...new Set([...selectedIds, ...rowIds])]);
  };

  const toggleRow = (id: string) => {
    setSelection(
      selectedIds.includes(id) ? selectedIds.filter((s) => s !== id) : [...selectedIds, id]
    );
  };

  const colSpan = columns.length + (selectable ? 1 : 0);

  return (
    <div className={cn("w-full space-y-4", className)}>
      {toolbar && <div className="flex flex-wrap items-center gap-3">{toolbar}</div>}

      <Table aria-busy={loading || undefined}>
        {caption && <TableCaption className="sr-only">{caption}</TableCaption>}
        <TableHeader>
          <tr>
            {selectable && (
              <TableHead className="w-12">
                <Checkbox
                  aria-label="Select all rows"
                  checked={allSelected}
                  indeterminate={someSelected}
                  onCheckedChange={toggleAll}
                  disabled={rows.length === 0}
                  className="bg-neo-offwhite"
                />
              </TableHead>
            )}
            {columns.map((column) => {
              const isSorted = sort?.columnId === column.id;
              const SortIcon = !isSorted
                ? ChevronsUpDown
                : sort.direction === "asc"
                  ? ArrowUp
                  : ArrowDown;
              return (
                <TableHead
                  key={column.id}
                  aria-sort={
                    isSorted ? (sort.direction === "asc" ? "ascending" : "descending") : undefined
                  }
                  className={cn(alignClass[column.align ?? "left"], column.className)}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(column.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 uppercase tracking-wider rounded-sm",
                        "hover:text-neo-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink",
                        isSorted && "text-neo-yellow"
                      )}
                    >
                      {column.header}
                      <SortIcon className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              );
            })}
          </tr>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: Math.min(pageSize ?? 5, 10) }, (_, i) => (
              <TableRow key={`loading-${i}`} className="hover:bg-transparent">
                {Array.from({ length: colSpan }, (_, j) => (
                  <TableCell key={j}>
                    <Skeleton variant="text" className="w-full max-w-[160px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : rows.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={colSpan} className="py-10 text-center text-neo-black-500">
                {emptyState}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => {
              const id = getRowId(row);
              const isSelected = selectedIds.includes(id);
              return (
                <TableRow
                  key={id}
                  data-state={isSelected ? "selected" : undefined}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn(
                    "data-[state=selected]:bg-neo-yellow-100",
                    onRowClick && "cursor-pointer"
                  )}
                >
                  {selectable && (
                    <TableCell onClick={(event) => event.stopPropagation()}>
                      <Checkbox
                        aria-label={`Select row ${id}`}
                        checked={isSelected}
                        onCheckedChange={() => toggleRow(id)}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      className={cn(alignClass[column.align ?? "left"], column.className)}
                    >
                      {column.cell
                        ? column.cell(row)
                        : column.accessor
                          ? renderValue(column.accessor(row))
                          : null}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {(selectable || totalPages > 1) && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-body-sm text-neo-black-500" aria-live="polite">
            {selectable ? `${selectedIds.length} selected` : ""}
          </p>
          {totalPages > 1 && (
            <PaginationRoot
              page={Math.min(page, totalPages)}
              totalPages={totalPages}
              onPageChange={changePage}
            />
          )}
        </div>
      )}
    </div>
  );
}
