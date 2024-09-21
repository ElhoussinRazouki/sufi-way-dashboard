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
import { ErrorMessage, useField } from 'formik';
import FormError from '../FormError';
import Help from '../Help';

type ComboBoxOption<T> = { label: string; value: T };

export type ComboBoxFieldProps<T> = {
  name: string;
  availableItems: ComboBoxOption<T>[];
  label?: string;
  className?: string;
  required?: boolean;
  searchPlaceholder?: string;
  selectPlaceholder?: string;
  noItemsFoundMessage?: string;
  onChange?: (value: T, selectedOption: ComboBoxOption<T>) => void;
  onSearchChange?: (search: string) => void;
  help?: string;
};

export default function ComboboxField<T extends string | number | null>({
  name,
  availableItems,
  label,
  className,
  required,
  searchPlaceholder = 'Search Items...',
  selectPlaceholder = 'Select items...',
  noItemsFoundMessage = 'No items found.',
  onChange,
  onSearchChange,
  help
}: ComboBoxFieldProps<T>) {
  const [field, _, helpers] = useField<T>(name);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ComboBoxOption<T>[]>(availableItems || []);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(searchQuery);
    }

    let updatedItems = availableItems.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // If required, add an empty option at the start
    if (!required) {
      updatedItems = [
        { label: 'Select no item', value: '' as T },
        ...updatedItems
      ];
    }

    setItems(updatedItems);
  }, [availableItems, searchQuery, onSearchChange, required]);

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
            className="w-full justify-between"
          >
            {field.value
              ? items.find((item) => item.value === field.value)?.label
              : selectPlaceholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={searchPlaceholder}
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>{noItemsFoundMessage}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => {
                  return (
                    <CommandItem
                      key={item.label}
                      value={`${item.value}`}
                      onSelect={(currentValue) => {
                        setOpen(false);
                        if (typeof item.value === 'number') {
                          helpers.setValue(parseInt(currentValue) as T);
                        } else {
                          helpers.setValue(currentValue as T);
                        }
                        onChange?.(currentValue as T, item);
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
      {help && <Help>{help}</Help>}
      <ErrorMessage name={name} component={FormError} />
    </div>
  );
}
