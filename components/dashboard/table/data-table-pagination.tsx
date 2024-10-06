import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '../../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select';

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
};

export function DataTablePagination<TData>({
  table
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
      <div className="flex w-full items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} من{' '}
          {table.getFilteredRowModel().rows.length} صف(وف) محدد(ة).
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center gap-2 space-x-2">
            <p className="whitespace-nowrap text-sm font-medium">
              الصفوف لكل صفحة
            </p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 40, 50, 75, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          الصفحة {table.getState().pagination.pageIndex + 1} من{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-1">
          <Button
            aria-label="الذهاب إلى الصفحة التالية"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="الذهاب إلى الصفحة الأخيرة"
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="الذهاب إلى الصفحة الأولى"
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="الذهاب إلى الصفحة السابقة"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
