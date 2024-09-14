import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, value: T) {
  const [persistedValue, setPersistedValue] = useState<T>(() => {
    try {
      let storedValue = localStorage.getItem(key);
      if (storedValue != null) return JSON.parse(storedValue) as T;
    } catch (error) {}

    return value;
  });

  // Sync values to localStorage
  const setPersistedValueDecorator = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    return setPersistedValue(value);
  };

  return [persistedValue, setPersistedValueDecorator] as const;
}

export function useNaiveLocalStorage<T>(key: string, value: T) {
  const getter = useCallback(() => {
    let storedValue = localStorage.getItem(key);

    try {
      if (storedValue != null) return JSON.parse(storedValue) as T;
    } catch (error) {}

    return value;
  }, [key, value]);

  const setter = useCallback(
    (value: ((val: T) => T) | T) => {
      return localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  // Register the default value
  if (getter() === null) setter(value);
  return [getter, setter] as const;
}

export function useEventListener<T>(
  eventName: string,
  defaultValue: T,
  callback: Function
) {
  const [value, setValue] = useState(defaultValue);

  const handleCallback = useCallback(
    (e: any) => {
      if (typeof callback === 'function')
        setValue(callback({ e, prevValue: value }));
    },
    [callback, value]
  );

  useEffect(() => {
    window.addEventListener(eventName, handleCallback);

    return () => {
      window.removeEventListener(eventName, handleCallback);
    };
  }, [eventName, handleCallback]);

  return [value, setValue] as const;
}

export function useUrlHash(defaultHash: string = '') {
  const [hash, setStateHash] = useState<string>(
    window.location.hash || defaultHash
  );

  const handleHashChange = useCallback(() => {
    setStateHash(window.location.hash);
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]);

  const setHash = useCallback((hash: string) => {
    window.location.hash = hash;
    setStateHash(hash);
  }, []);

  return [hash, setHash] as const;
}

export function useUrlQuery<T>(key: string, defaultValue: T) {
  const searchParams = new URLSearchParams(window.location.search); // this shouldn't be memoized

  const [query, setQueryState] = useState<T>(() => {
    try {
      let storedValue = searchParams.get(key);
      if (storedValue != null) return JSON.parse(storedValue) as T;
    } catch (error) {}

    return defaultValue;
  });

  const setQuery = useCallback(
    (value: T | ((prev: T) => T)) => {
      const searchParams = new URLSearchParams(window.location.search); // this shouldn't be memoized

      // Call if it's a function
      if (typeof value === 'function') {
        value = (value as Function)(query);
      }

      searchParams.set(key, JSON.stringify(value));

      // Sorting the search params to avoid re-ordering
      searchParams.sort();

      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${searchParams.toString()}`
      );
      return setQueryState(value);
    },
    [key, query]
  );

  return [query, setQuery] as const;
}

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

import * as React from 'react';

export function useCallbackRef<T extends (...args: never[]) => unknown>(
  callback: T | undefined
): T {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  // https://github.com/facebook/react/issues/19240
  return React.useMemo(
    () => ((...args) => callbackRef.current?.(...args)) as T,
    []
  );
}

type UseControllableStateParams<T> = {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: (state: T) => void;
};

type SetStateFn<T> = (prevState?: T) => T;

export function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {}
}: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;
  const handleChange = useCallbackRef(onChange);

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> =
    React.useCallback(
      (nextValue) => {
        if (isControlled) {
          const setter = nextValue as SetStateFn<T>;
          const value =
            typeof nextValue === 'function' ? setter(prop) : nextValue;
          if (value !== prop) handleChange(value as T);
        } else {
          setUncontrolledProp(nextValue);
        }
      },
      [isControlled, prop, setUncontrolledProp, handleChange]
    );

  return [value, setValue] as const;
}

function useUncontrolledState<T>({
  defaultProp,
  onChange
}: Omit<UseControllableStateParams<T>, 'prop'>) {
  const uncontrolledState = React.useState<T | undefined>(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = React.useRef(value);
  const handleChange = useCallbackRef(onChange);

  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value as T);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);

  return uncontrolledState;
}
