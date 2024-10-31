'use client';

import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import generateColumnsDefinition from '../table/columns';
import { TableMultiRowAction } from '../table/data-table';
import { PaginatedDataTable } from '../table/paginated-data-table';
import { Edit, Trash } from 'lucide-react';
import { debounce, formatDate } from '@/utils';
import { Avatar } from '@/components/reusables';
import { filterElementsType } from '../table/data-table-toolbar';
import { useToast } from '@/components/ui/use-toast';
import APIs from '@/api';
import React from 'react';
import { useZawya } from '@/hooks/dashboard/zawya.hook';
import { ZawyaDTO } from '@/types/zawya.types';

export default function ZawyaTable() {
  const router = useRouter();
  const { toast } = useToast();

  const { pagination, paginateList, remove, filters } = useZawya();

  const handleRemoveRecord = useCallback(
    async (row: Row<ZawyaDTO>) => {
      const id = row.original._id;
      await remove(id);
    },
    [remove]
  );

  const handleRemoveList = useCallback(
    async (rows: Row<ZawyaDTO>[]) => {
      const ids = rows.map((groupRow) => groupRow.original._id);
      try {
        for (const id of ids) {
          await remove(id);
        }
        toast({
          title: 'تم حذف معلومات الزاوية بنجاح',
          variant: 'default'
        });
      } catch (error) {
        const errorMessage = APIs.common.handleApiError(error);
        toast({ title: errorMessage, variant: 'destructive' });
      }
    },
    [remove, toast]
  );

  const handleUpdate = useCallback(
    async (groupRow: Row<ZawyaDTO>) => {
      const id = groupRow.original._id;
      router.push(`/dashboard/zawya/${id}/`);
    },
    [router]
  );

  const columns = useMemo(
    () =>
      generateColumnsDefinition<ZawyaDTO>({
        enableSelection: true,
        columnsDef: [
          {
            accessorKey: 'avatar',
            title: 'الصورة الرمزية',
            enableSorting: false,
            cell: ({ cell }) => {
              return (
                <Avatar
                  src={cell.row.original.avatar}
                  fallback="photo of the zawya"
                  className="cursor-pointer"
                  size={12}
                />
              );
            }
          },
          {
            accessorKey: 'name',
            title: 'الاسم',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="text-nowrap">{row.original.name}</span>
            )
          },
          {
            accessorKey: 'bio',
            title: 'النبذة',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="line-clamp-1">{row.original.bio || '-'}</span>
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
            cell: ({ row }) => (
              <span className="text-nowrap" dir="ltr">
                {formatDate(row.original.updated_at, {})}
              </span>
            ),
            enableSorting: false
          }
        ],
        actions: [
          { label: 'تحديث', clickHandler: handleUpdate, Icon: Edit },
          {
            label: 'حذف',
            clickHandler: handleRemoveRecord,
            Icon: Trash,
            isSensitive: true
          }
        ]
      }),
    [handleRemoveRecord, handleUpdate]
  );

  const multiRowActions: TableMultiRowAction<ZawyaDTO>[] = useMemo(
    () => [
      {
        label: 'حذف',
        clickHandler: handleRemoveList,
        Icon: Trash,
        isSensitive: true
      }
    ],
    [handleRemoveList]
  );

  const filterElements: filterElementsType = {
    searchInput: {
      accessorKey: 'name',
      placeholder: 'ابحث بالاسم...'
    }
  };

  return (
    <>
      {pagination && (
        <PaginatedDataTable
          paginatedData={paginateList}
          pagination={pagination}
          columns={columns}
          multiRowActions={multiRowActions}
          filterElements={filterElements}
          onFilterChange={debounce(filters.setFilters, 500)}
        />
      )}
    </>
  );
}
