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

export default function MultimediaTable() {
  const router = useRouter();

  const { pagination, paginatedMultiMedia, deleteMultimedia, filters } =
    useMultiMedia();

  const handleDeleteMultimedia = useCallback(
    async (groupRow: Row<MultimediaDTO>) => {
      const id = groupRow.original._id;
      try {
        await deleteMultimedia(id);
        toast({
          title: 'Multimedia deleted successfully',
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
    async (groupRows: Row<MultimediaDTO>[]) => {
      const ids = groupRows.map((groupRow) => groupRow.original._id);
      try {
        for (const id of ids) {
          await deleteMultimedia(id);
        }
        toast({
          title: 'Multimedia deleted successfully',
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
            accessorKey: 'author_id.name',
            title: 'Author',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="text-nowrap">
                {row.original?.author_id?.name || '-'}
              </span>
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
          {
            accessorKey: 'type',
            title: 'Type',
            enableSorting: false,
            cell: ({ row }) => (
              <CustomBadge type="random" intensity={2}>
                {row.original.type}
              </CustomBadge>
            )
          },
          {
            accessorKey: 'created_at',
            title: 'Created At',
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
          {
            label: 'Delete',
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
      { label: 'Delete', clickHandler: handleDeleteMultimediaList, Icon: Trash }
    ],
    [handleDeleteMultimediaList]
  );

  const filterElements: filterElementsType = {
    searchInput: {
      accessorKey: 'title',
      placeholder: 'Search by the title...'
    },
    multiSelectFilters: [
      {
        accessorKey: 'type',
        title: 'Type',
        options: [
          { label: 'Video', value: 'video' },
          { label: 'PDF', value: 'pdf' },
          { label: 'Audio', value: 'audio' }
        ]
      }
    ]
  };

  const onTableFilterChange = debounce((newFilters: unknown) => {
    filters.setFilters(newFilters as any);
  }, 500);

  return (
    paginatedMultiMedia && (
      <>
        <PaginatedDataTable
          paginatedData={paginatedMultiMedia}
          pagination={pagination}
          columns={columns}
          multiRowActions={multiRowActions}
          filterElements={filterElements}
          onFilterChange={onTableFilterChange}
        />
      </>
    )
  );
}
