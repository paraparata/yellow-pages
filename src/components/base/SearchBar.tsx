import Input from '../primitive/Input';
import Button from '../primitive/Button';
import useDebounce from '@/libs/hooks/useDebounce';
import { contextCreator } from '@/libs/utils/contextCreator';
import { useEffect, useState } from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import type { Interpolation, Theme } from '@emotion/react';

const [SearchBarProvider, useSearchBar] = contextCreator<string>();

interface SearchBarProps {
  sx?: Interpolation<Theme>;
}

const SearchBar: React.FC<SearchBarProps> = ({ sx }) => {
  const [value, setValue] = useState('');
  const [, setQuery] = useSearchBar();

  const debouncedVal = useDebounce(value, 500);

  useEffect(() => {
    if (value === debouncedVal) setQuery(debouncedVal);
  }, [value, debouncedVal, setQuery]);

  const reset = () => {
    setValue('');
    setQuery('');
  };

  return (
    <Input
      value={value}
      aria-label='search field contact'
      sx={sx}
      startIcon={<MagnifyingGlass size={20} weight='light' />}
      endIcon={
        value ? (
          <Button
            variant='icon'
            aria-label='reset search field'
            onClick={reset}
          >
            <X size={18} weight='light' />
          </Button>
        ) : undefined
      }
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export { SearchBarProvider, useSearchBar };
export default SearchBar;
