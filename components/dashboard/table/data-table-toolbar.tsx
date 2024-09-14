'use client';

import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cross2Icon } from '@radix-ui/react-icons';
import { SearchFilter, TableMultiRowAction } from './data-table';
import { DataTableMultiRowActions } from './data-table-multi-row-actions';
import { DataTableViewOptions } from './data-table-view-options';
import { cn } from '@/lib/utils';

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  multiRowActions?: TableMultiRowAction<TData>[];
  searchFilter?: SearchFilter;
  className?: string;
};

export function DataTableToolbar<TData>({
  table,
  multiRowActions = [],
  searchFilter,
  className
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex flex-1 items-center space-x-2">
        {searchFilter &&
          (searchFilter.onChangeHandler ? (
            <Input
              placeholder={
                searchFilter.placeholder ||
                `Search by ${searchFilter.accessorKey}...`
              }
              onChange={(event) =>
                searchFilter.onChangeHandler?.(event.target.value)
              }
              className="h-8 w-[150px] lg:w-[250px]"
            />
          ) : (
            <Input
              placeholder={
                searchFilter?.placeholder ||
                `Search by ${searchFilter?.accessorKey}...`
              }
              value={
                (table
                  .getColumn(searchFilter?.accessorKey || '')
                  ?.getFilterValue() as string) || ''
              }
              onChange={(event) =>
                table
                  .getColumn(searchFilter?.accessorKey || '')
                  ?.setFilterValue(event.target.value)
              }
              className="h-8 w-[150px] lg:w-[250px]"
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
