'use client';

import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import generateColumnsDefinition from '../table/columns';
import { TableMultiRowAction } from '../table/data-table';
import { PaginatedDataTable } from '../table/paginated-data-table';
import { Edit, Trash } from 'lucide-react';
import { debounce, formatDate } from '@/utils';
import CustomBadge from '@/components/reusables/CustomBadge';
import { filterElementsType } from '../table/data-table-toolbar';
import { toast } from '@/components/ui/use-toast';
import APIs from '@/api';
import React from 'react';
import { useAdkarAdia } from '@/hooks/dashboard/adkar-adia.hook';
import { AdkarAdiaDTO } from '@/types/adkar-adia.types';

export default function AdkarAdiaTable() {
  const router = useRouter();

  const { pagination, paginatedAdkarAdia, remove, filters } = useAdkarAdia();

  const handleDelete = useCallback(
    async (row: Row<AdkarAdiaDTO>) => {
      const id = row.original._id;
      try {
        await remove(id);
        toast({
          title: 'تم حذف الأذكار والأدعية بنجاح',
          variant: 'default'
        });
      } catch (error) {
        const errorMessage = APIs.common.handleApiError(error);
        toast({ title: errorMessage, variant: 'destructive' });
      }
    },
    [remove]
  );

  const handleDeleteMultiple = useCallback(
    async (rows: Row<AdkarAdiaDTO>[]) => {
      const ids = rows.map((row) => row.original._id);
      try {
        for (const id of ids) {
          await remove(id);
        }
        toast({
          title: 'تم حذف الأذكار والأدعية بنجاح',
          variant: 'default'
        });
      } catch (error) {
        const errorMessage = APIs.common.handleApiError(error);
        toast({ title: errorMessage, variant: 'destructive' });
      }
    },
    [remove]
  );

  const handleUpdate = useCallback(
    async (row: Row<AdkarAdiaDTO>) => {
      const id = row.original._id;
      router.push(`/dashboard/adkar-adia/${id}/`);
    },
    [router]
  );

  const columns = useMemo(
    () =>
      generateColumnsDefinition<AdkarAdiaDTO>({
        enableSelection: true,
        columnsDef: [
          {
            accessorKey: 'title',
            title: 'العنوان',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="line-clamp-1 min-w-28">
                {row.original.title}
              </span>
            )
          },
          {
            accessorKey: 'type',
            title: 'النوع',
            enableSorting: false,
            cell: ({ row }) => (
              <CustomBadge type="random" intensity={2}>
                {row.original.type}
              </CustomBadge>
            )
          },
          {
            accessorKey: 'content',
            title: 'المحتوى',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="line-clamp-1">
                {row.original.content[0] || ''}
              </span>
            )
          },
          {
            accessorKey: 'created_at',
            title: 'تاريخ الإنشاء',
            cell: ({ row }) => (
              <span className="text-nowrap" dir="ltr">
                {formatDate(row.original.created_at, {})}
              </span>
            )
          },
          {
            accessorKey: 'updated_at',
            title: 'تاريخ التحديث',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="text-nowrap" dir="ltr">
                {formatDate(row.original.updated_at, {})}
              </span>
            )
          }
        ],
        actions: [
          { label: 'تحديث', clickHandler: handleUpdate, Icon: Edit },
          {
            label: 'حذف',
            clickHandler: handleDelete,
            Icon: Trash,
            isSensitive: true
          }
        ]
      }),
    [handleDelete, handleUpdate]
  );

  const multiRowActions: TableMultiRowAction<AdkarAdiaDTO>[] = useMemo(
    () => [
      {
        label: 'حذف',
        clickHandler: handleDeleteMultiple,
        Icon: Trash,
        isSensitive: true
      }
    ],
    [handleDeleteMultiple]
  );

  const filterElements: filterElementsType = {
    searchInput: {
      accessorKey: 'title',
      placeholder: 'ابحث عن طريق العنوان...'
    },
    multiSelectFilters: [
      {
        accessorKey: 'type',
        title: 'النوع',
        options: [
          { label: 'أذكار', value: 'adkar' },
          { label: 'دعاء', value: 'doaa' }
        ]
      }
    ]
  };

  return (
    paginatedAdkarAdia && (
      <>
        <PaginatedDataTable
          paginatedData={paginatedAdkarAdia}
          pagination={pagination}
          columns={columns}
          multiRowActions={multiRowActions}
          filterElements={filterElements}
          onFilterChange={debounce(filters.setFilters, 500)}
        />
      </>
    )
  );
}
