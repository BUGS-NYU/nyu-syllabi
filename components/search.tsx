'use client'
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useDebounce } from 'use-debounce';

const Search = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  const pathname = usePathname();
  const [query] = useDebounce(text, 600);

  useEffect(() => {
    if (!query) {
      router.push(pathname);
    } else {
      router.push(`${pathname}/?search=${query}`)
    }
  }, [query, router]);

  return (
    <div>
      <TextField
        hiddenLabel
        id="school_class_search"
        value={text}
        type="search"
        variant="standard"
        placeholder="Search"
        InputProps={{
          disableUnderline: true,
        }}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

export default Search;
