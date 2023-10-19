import { useSyncExternalStore } from 'react';

type Selector<T, R> = (prev: T) => R;

type UseStore<T, M> = {
  <R>(selector: Selector<T | null, R>): R;
} & M;

export const localStorageCreator = <T extends object>(key: string) => {
  const getSnapshot = () => window.localStorage.getItem(key);

  const subscribe = (listener: () => any) => {
    window.addEventListener('storage', listener);
    return () => {
      window.removeEventListener('storage', listener);
    };
  };

  const useStore = <R>(selector: Selector<T | null, R>) => {
    const snapshot = useSyncExternalStore(subscribe, getSnapshot);
    return selector(snapshot ? JSON.parse(snapshot) : null);
  };

  const methods = {
    getSnapshot: () => {
      const rawPrevVal = window.localStorage.getItem(key);
      return (rawPrevVal ? JSON.parse(rawPrevVal) : null) as T | null;
    },
    setItem: (selector: Selector<T | null, T | null>) => {
      const rawPrevVal = window.localStorage.getItem(key);
      const prevVal = rawPrevVal ? JSON.parse(rawPrevVal) : null;
      const newVal = selector(prevVal);

      const newState = Object.assign({}, prevVal, newVal);
      window.localStorage.setItem(key, JSON.stringify(newState));
      window.dispatchEvent(
        new StorageEvent('storage', { key, newValue: newState })
      );
    },
    clear: () => window.localStorage.removeItem(key),
  };

  Object.assign(useStore, methods);
  return useStore as UseStore<T, typeof methods>;
};
