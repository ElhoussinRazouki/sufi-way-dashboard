'use client';

import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import generateColumnsDefinition from '../table/columns';
import { TableMultiRowAction } from '../table/data-table';
import { PaginatedDataTable } from '../table/paginated-data-table';
import { useMultiMedia } from '@/hooks/dashboard/multimedia.hook';
import { MultimediaDTO } from '@/types/multimedia.types';
import { Edit, Trash } from 'lucide-react';
import { debounce, formatDate } from '@/utils';
import CustomBadge from '@/components/reusables/CustomBadge';
import { filterElementsType } from '../table/data-table-toolbar';
import { toast } from '@/components/ui/use-toast';
import APIs from '@/api';
import React from 'react';

export default function MultimediaTable() {
  const router = useRouter();

  const { pagination, paginatedMultiMedia, deleteMultimedia, filters } =
    useMultiMedia();

  const handleDeleteMultimedia = useCallback(
    async (row: Row<MultimediaDTO>) => {
      const id = row.original._id;
      try {
        await deleteMultimedia(id);
        toast({
          title: 'تم حذف الوسائط المتعددة بنجاح',
          variant: 'default'
        });
      } catch (error) {
        const errorMessage = APIs.common.handleApiError(error);
        toast({ title: errorMessage, variant: 'destructive' });
      }
    },
    [deleteMultimedia]
  );

  const handleDeleteMultimediaList = useCallback(
    async (rows: Row<MultimediaDTO>[]) => {
      const ids = rows.map((row) => row.original._id);
      try {
        for (const id of ids) {
          await deleteMultimedia(id);
        }
        toast({
          title: 'تم حذف الوسائط المتعددة بنجاح',
          variant: 'default'
        });
      } catch (error) {
        const errorMessage = APIs.common.handleApiError(error);
        toast({ title: errorMessage, variant: 'destructive' });
      }
    },
    [deleteMultimedia]
  );

  const handleUpdateMultimedia = useCallback(
    async (row: Row<MultimediaDTO>) => {
      const id = row.original._id;
      router.push(`/dashboard/multimedia/${id}/`);
    },
    [router]
  );

  const columns = useMemo(
    () =>
      generateColumnsDefinition<MultimediaDTO>({
        enableSelection: true,
        columnsDef: [
          {
            accessorKey: 'title',
            title: 'العنوان',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="line-clamp-1">{row.original.title}</span>
            )
          },
          {
            accessorKey: 'author_id.name',
            title: 'المؤلف',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="text-nowrap">
                {row.original?.author_id?.name || '-'}
              </span>
            )
          },
          {
            accessorKey: 'url',
            title: 'الرابط',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="line-clamp-1">{row.original.url}</span>
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
          { label: 'تحديث', clickHandler: handleUpdateMultimedia, Icon: Edit },
          {
            label: 'حذف',
            clickHandler: handleDeleteMultimedia,
            Icon: Trash,
            isSensitive: true
          }
        ]
      }),
    [handleDeleteMultimedia, handleUpdateMultimedia]
  );

  const multiRowActions: TableMultiRowAction<MultimediaDTO>[] = useMemo(
    () => [
      {
        label: 'حذف',
        clickHandler: handleDeleteMultimediaList,
        Icon: Trash,
        isSensitive: true
      }
    ],
    [handleDeleteMultimediaList]
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
          { label: 'فيديو', value: 'video' },
          { label: 'مقالة', value: 'pdf' },
          { label: 'صوت', value: 'audio' }
        ]
      }
    ]
  };

  return (
    paginatedMultiMedia && (
      <>
        <PaginatedDataTable
          paginatedData={paginatedMultiMedia}
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
