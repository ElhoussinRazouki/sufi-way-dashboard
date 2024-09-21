'use client';

import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cross2Icon } from '@radix-ui/react-icons';
import { SearchFilter, TableMultiRowAction } from './data-table';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableMultiRowActions } from './data-table-multi-row-actions';
import { DataTableViewOptions } from './data-table-view-options';

type MultiSelectFilter = {
  accessorKey: string;
  title: string;
  options: {
    label: string;
    value: string;
    Icon?: React.ComponentType<{ className?: string }>;
  }[];
};

export type filterElementsType = {
  searchInput?: SearchFilter;
  multiSelectFilters?: MultiSelectFilter[];
};

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  multiRowActions?: TableMultiRowAction<TData>[];
  filterElements?: filterElementsType;
};

export function DataTableToolbar<TData>({
  table,
  multiRowActions = [],
  filterElements = {}
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filterElements?.searchInput && (
          <Input
            placeholder={
              filterElements?.searchInput?.placeholder ||
              `Search by ${filterElements?.searchInput?.accessorKey}...`
            }
            value={
              (table
                .getColumn(filterElements?.searchInput?.accessorKey || '')
                ?.getFilterValue() as string) || ''
            }
            onChange={(event) =>
              table
                .getColumn(filterElements?.searchInput?.accessorKey || '')
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {filterElements?.multiSelectFilters?.map((filter) => (
          <DataTableFacetedFilter
            key={filter.accessorKey}
            column={table.getColumn(filter.accessorKey)}
            title={filter.title}
            options={filter.options}
          />
        ))}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {multiRowActions.length > 0 &&
        table.getFilteredSelectedRowModel().rows.length > 0 && (
          <DataTableMultiRowActions
            rows={table.getFilteredSelectedRowModel().rows}
            actions={multiRowActions}
          />
        )}
      <DataTableViewOptions table={table} />
    </div>
  );
}
