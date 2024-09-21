import { parseFilter } from '@/utils';
import { useCallback, useState } from 'react';

/**
 * A hook to manage a set of filters that can be used for API filtering.
 *
 * @param filters The default filters to use. This will be used as the initial state.
 * @param parseOptions The options to pass to `parseFilter` when generating the query.
 * @returns An object with the following properties:
 * - `filters`: The current state of the filters. This is a shallow copy of the original filters.
 * - `setFilters`: A function to update the filters. This can be called with either a partial filters object, or a function that takes the current filters and returns a new filters object.
 * - `query`: The current query string of the filters. This is the result of calling `parseFilter` with the current filters and the `parseOptions`.
 * - `reset`: A function to reset one or all of the filters to their default values.
 *   - If called with a `filter` argument, only that filter will be reset.
 *   - If called without arguments, all filters will be reset.
 */
export function useFilters<T extends Record<string, unknown>>({
  filters,
  parseOptions
}: {
  filters: T;
  parseOptions?: Parameters<typeof parseFilter>[1];
}) {
  // TODO: use useUrlQueryParams to save the filters in the url
  const [_filters, _setFilters] = useState<T>(filters);

  const setFilters = useCallback(
    (filters: Partial<T> | ((filters: T) => T)) => {
      if (typeof filters === 'function') {
        return _setFilters((prevFilters) => filters(prevFilters));
      }

      if (parseOptions?.override) {
        _setFilters(filters as T);
      } else {
        _setFilters((prevFilters) => ({ ...prevFilters, ...filters }));
      }
    },
    [parseOptions?.override]
  );

  const reset = useCallback(
    (filter?: keyof T) => {
      if (filter)
        _setFilters((prevFilters) => ({
          ...prevFilters,
          [filter]: filters[filter] // reset to the default value
        }));
    },
    [filters]
  );

  return {
    filters: _filters,
    setFilters,
    query: parseFilter(_filters, parseOptions),
    reset
  };
}
