'use client';

import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import generateColumnsDefinition from '../table/columns';
import { TableMultiRowAction } from '../table/data-table';
import { PaginatedDataTable } from '../table/paginated-data-table';
import { Edit, Trash } from 'lucide-react';
import { debounce, formatDate } from '@/utils';
import { filterElementsType } from '../table/data-table-toolbar';
import { toast } from '@/components/ui/use-toast';
import APIs from '@/api';
import { useNews } from '@/hooks/dashboard/news.hook';
import { NewsDTO } from '@/types/news.types';
import React from 'react';

export default function NewsTable() {
  const router = useRouter();

  const { pagination, paginatedNews, remove, filters } = useNews();

  const handleDelete = useCallback(
    async (row: Row<NewsDTO>) => {
      const id = row.original._id;
      try {
        await remove(id);
        toast({
          title: 'تم حذف الخبر بنجاح',
          variant: 'default'
        });
      } catch (error) {
        const errorMessage = APIs.common.handleApiError(error);
        toast({ title: errorMessage, variant: 'destructive' });
      }
    },
    [remove]
  );

  const handleDeleteList = useCallback(
    async (rows: Row<NewsDTO>[]) => {
      const ids = rows.map((row) => row.original._id);
      try {
        for (const id of ids) {
          await remove(id);
        }
        toast({
          title: 'تم حذف قائمة الأخبار بنجاح',
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
    async (row: Row<NewsDTO>) => {
      const id = row.original._id;
      router.push(`/dashboard/news/${id}/`);
    },
    [router]
  );

  const columns = useMemo(
    () =>
      generateColumnsDefinition<NewsDTO>({
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
            accessorKey: 'description',
            title: 'الوصف',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="line-clamp-1">{row.original.url}</span>
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
            accessorKey: 'created_at',
            title: 'تاريخ الإنشاء',
            cell: ({ row }) => (
              <span>
                {formatDate(row.original.created_at, {
                  format: 'full',
                  includeTime: true
                })}
              </span>
            )
          },
          {
            accessorKey: 'updated_at',
            title: 'تاريخ التحديث',
            enableSorting: false,
            cell: ({ row }) => (
              <span>
                {formatDate(row.original.updated_at, {
                  format: 'full',
                  includeTime: true
                })}
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

  const multiRowActions: TableMultiRowAction<NewsDTO>[] = useMemo(
    () => [
      {
        label: 'حذف',
        clickHandler: handleDeleteList,
        Icon: Trash,
        isSensitive: true
      }
    ],
    [handleDeleteList]
  );

  const filterElements: filterElementsType = {
    searchInput: {
      accessorKey: 'title',
      placeholder: 'ابحث عن طريق العنوان...'
    }
  };

  return (
    paginatedNews && (
      <>
        <PaginatedDataTable
          paginatedData={paginatedNews}
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
