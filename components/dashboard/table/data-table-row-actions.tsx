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
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { AlertModal } from '@/components/modal/alert-modal';
import React from 'react';

type DataTableRowActionsProps<TData> = {
  row: Row<TData>;
  actions: TableRowAction<TData>[];
};

export function DataTableRowActions<TData>({
  row,
  actions
}: DataTableRowActionsProps<TData>) {
  const [openModal, setOpenModal] = useState({
    open: false,
    onConfirm: async () => {}
  });

  return (
    <>
      <AlertModal
        isOpen={openModal.open}
        onClose={() => setOpenModal({ open: false, onConfirm: async () => {} })}
        onConfirm={openModal.onConfirm}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">افتح القائمة</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>إجراءات</DropdownMenuLabel>
          {actions.map(({ clickHandler, label, Icon, isSensitive }) => {
            if (!isSensitive) {
              return (
                <DropdownMenuItem
                  onClick={() => clickHandler(row)}
                  key={label}
                  className="flex gap-1"
                >
                  {Icon && <Icon className="mr-2 h-4 w-4" />}
                  {label}
                </DropdownMenuItem>
              );
            }
            return (
              <DropdownMenuItem
                onClick={() =>
                  setOpenModal({
                    open: true,
                    onConfirm: async () => await clickHandler(row)
                  })
                }
                key={label}
                className="flex gap-1"
              >
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
