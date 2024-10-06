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
import React from 'react';

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
          title: 'تم حذف الأسئلة الشائعة بنجاح',
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
            title: 'السؤال',
            enableSorting: false
          },
          {
            accessorKey: 'response',
            title: 'الإجابة',
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

  const multiRowActions: TableMultiRowAction<FqDTO>[] = useMemo(
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
