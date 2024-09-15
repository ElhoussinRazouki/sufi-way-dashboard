'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useField } from 'formik';

export type ComboBoxFieldProps<T> = {
  name: string;
  availableItems: { label: string; value: T }[];
  label?: string;
  className?: string;
  required?: boolean;
  onChange?: (search: string) => void;
  searchPlaceholder?: string;
  selectPlaceholder?: string;
  noItemsFoundMessage?: string;
};

export default function ComboboxField<T extends string | number | null>({
  name,
  availableItems,
  label,
  className,
  required,
  onChange,
  searchPlaceholder = 'Search Items...',
  selectPlaceholder = 'Select items...',
  noItemsFoundMessage = 'No items found.'
}: ComboBoxFieldProps<T>) {
  const [field, _, helpers] = useField<T>(name);
  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (onChange) {
      // call the on change
      onChange(searchQuery);
    }
  }, [availableItems, onChange, searchQuery]);

  return (
    <div className={cn(`mb-2 flex flex-col gap-1 text-primary ${className}`)}>
      {label && (
        <Label htmlFor={name} className="mb-2">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {field.value
              ? availableItems.find((item) => item.value === field.value)?.label
              : selectPlaceholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={searchPlaceholder}
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>{noItemsFoundMessage}</CommandEmpty>
              <CommandGroup>
                {availableItems.map((item) => {
                  return (
                    <CommandItem
                      key={item.label}
                      value={`${item.value}`}
                      onSelect={(currentValue) => {
                        setOpen(false);
                        if (typeof item.value === 'number') {
                          return helpers.setValue(parseInt(currentValue) as T);
                        }
                        return helpers.setValue(currentValue as T);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          field.value === item.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
