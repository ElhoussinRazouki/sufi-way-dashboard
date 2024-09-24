'use client';

import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import generateColumnsDefinition from '../table/columns';
import { TableMultiRowAction } from '../table/data-table';
import { PaginatedDataTable } from '../table/paginated-data-table';
import { Edit, Trash } from 'lucide-react';
import { useFrequentQuestions } from '@/hooks/dashboard/fq.hook';
import { FqDTO } from '@/types/fq.types';
import APIs from '@/api';
import { useToast } from '@/components/ui/use-toast';

export default function FrequentQuestionsTable() {
  const router = useRouter();
  const { toast } = useToast();
  const { pagination, paginateList, remove } = useFrequentQuestions();

  const handleRemoveRecord = useCallback(
    async (row: Row<FqDTO>) => {
      const id = row.original._id;
      await remove(id);
    },
    [remove]
  );

  const handleRemoveList = useCallback(
    async (rows: Row<FqDTO>[]) => {
      const ids = rows.map((row) => row.original._id);
      try {
        for (const id of ids) {
          await remove(id);
        }
        toast({
          title: 'FAQs deleted successfully',
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
    async (row: Row<FqDTO>) => {
      const id = row.original._id;
      router.push(`/dashboard/frequent-questions/${id}/`);
    },
    [router]
  );

  const columns = useMemo(
    () =>
      generateColumnsDefinition<FqDTO>({
        enableSelection: true,
        columnsDef: [
          {
            accessorKey: 'question',
            title: 'Question',
            enableSorting: false
          },
          {
            accessorKey: 'response',
            title: 'Response',
            enableSorting: false
          }
        ],
        actions: [
          { label: 'Update', clickHandler: handleUpdate, Icon: Edit },
          {
            label: 'Delete',
            clickHandler: handleRemoveRecord,
            Icon: Trash,
            isSensitive: true
          }
        ]
      }),
    [handleRemoveRecord, handleUpdate]
  );

  const multiRowActions: TableMultiRowAction<FqDTO>[] = useMemo(
    () => [
      {
        label: 'Delete',
        clickHandler: handleRemoveList,
        Icon: Trash,
        isSensitive: true
      }
    ],
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
