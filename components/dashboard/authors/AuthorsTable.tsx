'use client';

import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import generateColumnsDefinition from '../table/columns';
import { SearchFilter, TableMultiRowAction } from '../table/data-table';
import { PaginatedDataTable } from '../table/paginated-data-table';
import { AuthorDTO } from '@/types/multimedia.types';
import { Edit, Trash } from 'lucide-react';
import { formatDate } from '@/utils';
import { useAuthors } from '@/hooks/dashboard/authors.hook';
import { Avatar } from '@/components/reusables';

export default function AuthorsTable() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const { pagination, paginateList, remove } = useAuthors(query);

  const handleRemoveRecord = useCallback(
    (groupRow: Row<AuthorDTO>) => {
      const id = groupRow.original._id;
      remove(id);
    },
    [remove]
  );

  const handleRemoveList = useCallback(
    (groupRows: Row<AuthorDTO>[]) => {
      const ids = groupRows.map((groupRow) => groupRow.original._id);
      ids.forEach((id) => remove(id));
    },
    [remove]
  );

  const handleUpdate = useCallback(
    (groupRow: Row<AuthorDTO>) => {
      const id = groupRow.original._id;
      router.push(`/dashboard/authors/${id}/`);
    },
    [router]
  );

  const columns = useMemo(
    () =>
      generateColumnsDefinition<AuthorDTO>({
        enableSelection: true,
        columnsDef: [
          {
            accessorKey: 'avatar',
            title: 'Avatar',
            enableSorting: false,
            cell: ({ cell }) => {
              return (
                <Avatar
                  src={cell.row.original.avatar}
                  fallback="author avatar"
                  className="cursor-pointer"
                  size={12}
                />
              );
            }
          },
          {
            accessorKey: 'name',
            title: 'Name',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="text-nowrap">{row.original.name}</span>
            )
          },
          {
            accessorKey: 'bio',
            title: 'Bio',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="line-clamp-1">{row.original.bio || '-'}</span>
            )
          },
          {
            accessorKey: 'created_at',
            title: 'Created At',
            enableSorting: false,
            cell: ({ row }) => (
              <span className="text-nowrap">
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
            cell: ({ row }) => (
              <span className="text-nowrap">
                {formatDate(row.original.updated_at, {
                  format: 'full',
                  includeTime: true
                })}
              </span>
            ),
            enableSorting: false
          }
        ],
        actions: [
          { label: 'Update', clickHandler: handleUpdate, Icon: Edit },
          { label: 'Delete', clickHandler: handleRemoveRecord, Icon: Trash }
        ]
      }),
    [handleRemoveRecord, handleUpdate]
  );

  const multiRowActions: TableMultiRowAction<AuthorDTO>[] = useMemo(
    () => [{ label: 'Delete', clickHandler: handleRemoveList, Icon: Trash }],
    [handleRemoveList]
  );

  return (
    <>
      {pagination && (
        <PaginatedDataTable
          paginatedData={paginateList}
          pagination={pagination}
          columns={columns}
          multiRowActions={multiRowActions}
        />
      )}
    </>
  );
}
