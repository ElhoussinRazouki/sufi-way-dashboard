import { useCallback, useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, value: T) {
  const [persistedValue, setPersistedValue] = useState<T>(() => {
    try {
      let storedValue = localStorage.getItem(key)
      if (storedValue != null) return JSON.parse(storedValue) as T
    } catch (error) {}

    return value
  })

  // Sync values to localStorage
  const setPersistedValueDecorator = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
    return setPersistedValue(value)
  }

  return [persistedValue, setPersistedValueDecorator] as const
}

export function useNaiveLocalStorage<T>(key: string, value: T) {
  const getter = useCallback(() => {
    let storedValue = localStorage.getItem(key)

    try {
      if (storedValue != null) return JSON.parse(storedValue) as T
    } catch (error) {}

    return value
  }, [key, value])

  const setter = useCallback(
    (value: ((val: T) => T) | T) => {
      return localStorage.setItem(key, JSON.stringify(value))
    },
    [key],
  )

  // Register the default value
  if (getter() === null) setter(value)
  return [getter, setter] as const
}

export function useEventListener<T>(eventName: string, defaultValue: T, callback: Function) {
  const [value, setValue] = useState(defaultValue)

  const handleCallback = useCallback(
    (e: any) => {
      if (typeof callback === "function") setValue(callback({ e, prevValue: value }))
    },
    [callback, value],
  )

  useEffect(() => {
    window.addEventListener(eventName, handleCallback)

    return () => {
      window.removeEventListener(eventName, handleCallback)
    }
  }, [eventName, handleCallback])

  return [value, setValue] as const
}

export function useUrlHash(defaultHash: string = "") {
  const [hash, setStateHash] = useState<string>(window.location.hash || defaultHash)

  const handleHashChange = useCallback(() => {
    setStateHash(window.location.hash)
  }, [])

  useEffect(() => {
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [handleHashChange])

  const setHash = useCallback((hash: string) => {
    window.location.hash = hash
    setStateHash(hash)
  }, [])

  return [hash, setHash] as const
}

export function useUrlQuery<T>(key: string, defaultValue: T) {
  const searchParams = new URLSearchParams(window.location.search) // this shouldn't be memoized

  const [query, setQueryState] = useState<T>(() => {
    try {
      let storedValue = searchParams.get(key)
      if (storedValue != null) return JSON.parse(storedValue) as T
    } catch (error) {}

    return defaultValue
  })

  const setQuery = useCallback(
    (value: T | ((prev: T) => T)) => {
      const searchParams = new URLSearchParams(window.location.search) // this shouldn't be memoized

      // Call if it's a function
      if (typeof value === "function") {
        value = (value as Function)(query)
      }

      searchParams.set(key, JSON.stringify(value))

      // Sorting the search params to avoid re-ordering
      searchParams.sort()

      window.history.replaceState({}, "", `${window.location.pathname}?${searchParams.toString()}`)
      return setQueryState(value)
    },
    [key, query],
  )

  return [query, setQuery] as const
}

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function useSuspenseAsync<T>(promise: () => Promise<T>): T {
  const [result, setResult] = useState<{ value?: T; error?: Error }>({})
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  // console.log("hook use effect")
  //   let isMounted = true

  //   promise
  //     .then((data) => {
  //       if (isMounted) {
  //         setResult({ value: data })
  //       }
  //     })
  //     .catch((error) => {
  //       if (isMounted) {
  //         setResult({ error })
  //       }
  //     })

  //   return () => {
  //     isMounted = false // Clean up to prevent state updates on unmounted component
  //   console.log("unmount hook use effect")

  //   }
  // }, []) // Empty dependency array to ensure it runs only once

  console.log("hook started", isLoading)

  if (!isLoading) {
    setIsLoading(true)
    console.log("promise started", isLoading)
    throw promise()
      .then((data) => {
        setIsLoading(false)
        console.log("set promise result", data)
        setResult({ value: data })
      })
      .catch((error) => {
        console.log("promise error")
        throw error
      })
  }

  // if (result?.error) {
  //   throw result.error // Trigger error boundary
  // }

  // if (result?.value === undefined) {
  //   throw promise() // Suspense will wait for this promise to resolve
  // }
  console.log("return result")
  return result.value as T
}
