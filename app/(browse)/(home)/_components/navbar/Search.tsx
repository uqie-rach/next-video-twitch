'use client';

import qs from 'query-string';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, X } from 'lucide-react';

const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState('second');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl({
      url: '/search',
      query: {
        term: value,
      }
    }, { skipEmptyString: true });

    router.push(url);
  }

  function onClear() {
    setValue('');
  }

  return (
    <form
      onSubmit={onSubmit}
      className='relative w-full lg:w-[400px] flex items-center'
    >
      <Input
        type='text'
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='Search...'
        className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none bg-black/90'
      />
      {
        value && (
          <X onClick={onClear} className='absolute top-2.5 right-12 h-5 w-5 text-white/60 cursor-pointer hover:opacity-75 transition' />
        )
      }
      <Button
        type='submit'
        className='rounded-l-none'
        variant='secondary'
        size='sm'
      >
        <SearchIcon className='h-5 w-5 text-muted-foreground' />
      </Button>
    </form>
  )
}

export default Search;
