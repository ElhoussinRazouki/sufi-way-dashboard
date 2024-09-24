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
import { AlertModal } from '@/components/modal/alert-modal';
import { useState } from 'react';

type DataTableMultiRowActionsProps<TData> = {
  rows: Row<TData>[];
  actions: TableMultiRowAction<TData>[];
};

export function DataTableMultiRowActions<TData>({
  rows,
  actions
}: DataTableMultiRowActionsProps<TData>) {
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
          {actions.map(({ clickHandler, label, Icon, isSensitive }) => {
            if (!isSensitive) {
              return (
                <DropdownMenuItem
                  onClick={() => clickHandler(rows)}
                  key={label}
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
                    onConfirm: async () => await clickHandler(rows)
                  })
                }
                key={label}
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
