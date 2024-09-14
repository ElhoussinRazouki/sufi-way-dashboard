'use client';

import { Row } from '@tanstack/react-table';

import { ChevronDown } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../../ui/dropdown-menu';
import { TableMultiRowAction } from './data-table';

type DataTableMultiRowActionsProps<TData> = {
  rows: Row<TData>[];
  actions: TableMultiRowAction<TData>[];
};

export function DataTableMultiRowActions<TData>({
  rows,
  actions
}: DataTableMultiRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original)
  // TODO: schema parsing
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="flex h-8 gap-2 px-1 data-[state=open]:bg-muted "
        >
          <span className="flex h-5  items-center justify-center rounded-full bg-gray-600 p-1 px-2 text-gray-100">
            {rows.length}
          </span>
          <span>item(s)</span>
          <ChevronDown className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {actions.map(({ clickHandler, label, Icon }, i) => (
          <DropdownMenuItem key={i} onClick={() => clickHandler(rows)}>
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
