'use client';

import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import generateColumnsDefinition from '../table/columns';
import { SearchFilter, TableMultiRowAction } from '../table/data-table';
import { PaginatedDataTable } from '../table/paginated-data-table';
import { useMultiMedia } from '@/hooks/dashboard/multimedia.hook';
import { MultimediaDTO } from '@/types/multimedia.types';
import { Edit, Trash } from 'lucide-react';
import { formatDate } from '@/utils';

export default function MultimediaTable() {
  const router = useRouter();
  const { pagination, paginatedMultiMedia, deleteMultimedia } = useMultiMedia();

  const handleDeleteMultimedia = useCallback(
    (groupRow: Row<MultimediaDTO>) => {
      const id = groupRow.original._id;
      deleteMultimedia(id);
    },
    [deleteMultimedia]
  );

  const handleDeleteMultimediaList = useCallback(
    (groupRows: Row<MultimediaDTO>[]) => {
      const ids = groupRows.map((groupRow) => groupRow.original._id);
      ids.forEach((id) => deleteMultimedia(id));
    },
    [deleteMultimedia]
  );

  const handleUpdateMultimedia = useCallback(
    (groupRow: Row<MultimediaDTO>) => {
      const id = groupRow.original._id;
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
            title: 'Title',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="line-clamp-1">{row.original.title}</span>
            )
          },
          {
            accessorKey: 'author',
            title: 'Author',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="line-clamp-1">{row.original.author || '-'}</span>
            )
          },
          {
            accessorKey: 'url',
            title: 'URL',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="line-clamp-1">{row.original.url}</span>
            )
          },
          { accessorKey: 'type', title: 'Type', enableSorting: false },
          {
            accessorKey: 'created_at',
            title: 'Created At',
            enableSorting: false,
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
            title: 'Updated At',
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
          { label: 'Update', clickHandler: handleUpdateMultimedia, Icon: Edit },
          { label: 'Delete', clickHandler: handleDeleteMultimedia, Icon: Trash }
        ]
      }),
    [handleDeleteMultimedia, handleUpdateMultimedia]
  );

  const multiRowActions: TableMultiRowAction<MultimediaDTO>[] = useMemo(
    () => [
      { label: 'Delete', clickHandler: handleDeleteMultimediaList, Icon: Trash }
    ],
    [handleDeleteMultimediaList]
  );

  const nameSearchFilter: SearchFilter = useMemo(
    () => ({
      accessorKey: 'title',
      placeholder: 'Search by title...'
    }),
    []
  );

  return (
    <PaginatedDataTable
      paginatedData={paginatedMultiMedia}
      pagination={pagination}
      columns={columns}
      searchFilter={nameSearchFilter}
      multiRowActions={multiRowActions}
    />
  );
}
