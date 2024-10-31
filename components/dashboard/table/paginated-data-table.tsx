'use client';

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import * as React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../ui/table';
import { DataTableProps } from './data-table';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar, filterElementsType } from './data-table-toolbar';
import { PaginatedResponseDto } from '@/types';
import { ScrollBar, ScrollArea } from '@/components/ui/scroll-area';
import { formatTableFilters } from '@/utils';

export type Pagination = {
  page: number;
  limit: number;
  setPage: (value: number) => void;
  setLimit: (value: number) => void;
  query: string;
};

export type PaginatedDataTableProps<TData, TValue> = Omit<
  DataTableProps<TData, TValue>,
  'data'
> & {
  paginatedData: PaginatedResponseDto<TData>;
  pagination?: Pagination;
  filterElements?: filterElementsType;
  onFilterChange?: (filters: unknown) => void; // figure out typing
};

export function PaginatedDataTable<TData, TValue>({
  columns,
  paginatedData,
  pagination,
  searchFilter,
  multiRowActions,
  className,
  tableRowClassName,
  tableCellClassName,
  onRowClick,
  filterElements,
  onFilterChange
}: PaginatedDataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const pageCount = Math.ceil(paginatedData.total / paginatedData.limit);

  const table = useReactTable({
    data: paginatedData.data,
    columns,
    pageCount,
    manualPagination: true,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: pagination
        ? {
            pageIndex: pagination.page - 1,
            pageSize: pagination.limit
          }
        : undefined
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(newSorting);

      // Call parent handler if it exists
      if (onFilterChange) {
        const newSort = {
          sort: newSorting.length
            ? newSorting[0].desc
              ? 'desc'
              : 'asc'
            : undefined
        };

        if (newSort.sort) {
          onFilterChange({
            ...formatTableFilters(columnFilters),
            ...newSort
          });
        } else {
          onFilterChange(formatTableFilters(columnFilters));
        }
      }
    },
    onColumnFiltersChange: (updater) => {
      const newFilters =
        typeof updater === 'function' ? updater(columnFilters) : updater;

      if (newFilters) {
        setColumnFilters(newFilters);
        if (onFilterChange) {
          onFilterChange(formatTableFilters(newFilters));
        }
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === 'function'
          ? updater(table.getState().pagination)
          : updater;

      if (pagination) {
        const { pageIndex, pageSize } = newState;

        // Update the pagination state in the parent component
        pagination.setPage(pageIndex + 1); // Convert to 1-based index
        pagination.setLimit(pageSize);
      }
    }
  });

  return (
    <>
      <DataTableToolbar
        table={table}
        multiRowActions={multiRowActions}
        filterElements={filterElements}
      />
      <ScrollArea className="sm:w[98vw] h-[calc(80vh-220px)] w-[90vw] rounded-md border md:w-auto">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  لا توجد نتائج.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <DataTablePagination table={table} />
    </>
  );
}
