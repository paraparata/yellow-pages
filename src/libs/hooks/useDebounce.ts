import { useEffect, useState } from 'react';

/**
 * [Reference](https://github.com/uidotdev/usehooks/blob/0a4eb076f0938a14496ad04ce93a19c66ed42e9a/index.js#L239)
 */
const useDebounce = <T>(value: T, delay: number) => {
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
};

export default useDebounce;
