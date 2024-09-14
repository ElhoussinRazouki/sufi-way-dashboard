'use client';

import { Row } from '@tanstack/react-table';

import { Button } from '../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../../ui/dropdown-menu';
import { TableRowAction } from './data-table';
import { AlertModal } from '@/components/modal/alert-modal';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

type DataTableRowActionsProps<TData> = {
  row: Row<TData>;
  actions: TableRowAction<TData>[];
};

export function DataTableRowActions<TData>({
  row,
  actions
}: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);

  const onConfirm = async () => {};

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={false}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {actions.map(({ clickHandler, label, Icon }) => {
            return (
              <DropdownMenuItem onClick={() => clickHandler(row)} key={label}>
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}