'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '../../ui/checkbox';

import { Square, CheckSquare } from 'lucide-react';
import { TableRowAction } from './data-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

type ColumnDefinition<T> = ColumnDef<T> & {
  accessorKey: string;
  title: string;
};

export type ColumnDefinitionsProps<T> = {
  columnsDef: ColumnDefinition<T>[];
  enableSelection?: boolean;
  actions?: TableRowAction<T>[];
};

export default function generateColumnsDefinition<T>({
  columnsDef,
  enableSelection,
  actions
}: ColumnDefinitionsProps<T>) {
  const columns: ColumnDef<T>[] = [];
  if (enableSelection) {
    columns.push({
      id: 'select',
      header: ({ table }) => (
        <div className="flex justify-start p-2">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="p-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false
    });
  }
  columnsDef.map((columnDef) => {
    columns.push({
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={columnDef.title} />
      ),
      cell: ({ row }) => {
        const value = row.getValue(columnDef.accessorKey);
        if (typeof value === 'boolean') {
          return (
            <div className="p-2">
              {value ? (
                <CheckSquare size={16} className="text-green-500" />
              ) : (
                <Square size={16} className="text-red-500" />
              )}
            </div>
          );
        }
        return (
          <div className="py-1">
            {row.getValue(columnDef.accessorKey)?.toString() || (
              <span className="opacity-75">-</span>
            )}
          </div>
        );
      },
      ...columnDef
    });
  });

  if (actions?.length) {
    columns.push({
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions row={row} actions={actions} />
    });
  }

  return columns;
}
