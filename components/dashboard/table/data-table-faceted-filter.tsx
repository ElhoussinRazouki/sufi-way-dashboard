import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/react-table';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '../../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Separator } from '../../ui/separator';

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options
}: DataTableFacetedFilterProps<TData, TValue>) {
  const selectedValue = column?.getFilterValue() as string | undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex h-8 gap-1 border-dashed"
        >
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValue && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="hidden space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {
                    options.find((option) => option.value === selectedValue)
                      ?.label
                  }
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} className="ms-1" />
          <CommandList>
            <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValue === option.value;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      const newValue = isSelected ? undefined : option.value;
                      column?.setFilterValue(newValue);
                    }}
                    className="flex gap-2"
                  >
                    <div
                      className={cn(
                        ' flex h-4 w-4 items-center justify-center gap-1 rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {/* {facets?.get(option.value) && (
              <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
              {facets.get(option.value)}
              </span>
            )} */}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValue && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    مسح الفلاتر
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
