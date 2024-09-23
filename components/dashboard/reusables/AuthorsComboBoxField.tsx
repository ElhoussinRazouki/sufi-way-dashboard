import ComboboxField, {
  ComboBoxFieldProps
} from '@/components/reusables/fields/ComboBoxField';
import { useAuthors } from '@/hooks/dashboard/authors.hook';
import { AuthorDTO } from '@/types/multimedia.types';
import { debounce } from '@/utils';
import React, { useCallback, useState } from 'react';

type AuthorsComboBoxFieldProps = Partial<ComboBoxFieldProps<AuthorDTO>> & {
  defaultAuthor?: AuthorDTO;
};

export default function AuthorsComboBoxField({
  defaultAuthor,
  ...props
}: AuthorsComboBoxFieldProps) {
  const { list, filters } = useAuthors();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeHandler = useCallback(
    debounce((value: string) => {
      filters.setFilters({ name: value });
    }, 500),
    []
  );

  const items = [];
  if (defaultAuthor)
    items.push({ label: defaultAuthor.name, value: defaultAuthor._id });
  list?.forEach((item) => {
    if (defaultAuthor && item._id === defaultAuthor._id) return;
    items.push({ label: item.name, value: item._id });
  });

  return (
    <ComboboxField
      {...props}
      availableItems={items}
      name={props.name || 'author_id'}
      onChange={onChangeHandler}
    />
  );
}
