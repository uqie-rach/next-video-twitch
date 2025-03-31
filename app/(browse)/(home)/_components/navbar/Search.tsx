'use client';

import qs from 'query-string';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { SearchIcon, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!value) {
      toast.error('Field cannot be empty');
      return;
    };

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
        placeholder='Search streams or users'
        className='rounded-r-none focus-visible:ring-white/40 border-none !bg-foreground/5'
      />
      {
        value && (
          <X onClick={onClear} className='absolute top-2.5 right-12 h-5 w-5 text-foreground/50 cursor-pointer hover:opacity-75 transition' />
        )
      }
      <Button
        type='submit'
        className='rounded-l-none cursor-pointer'
        variant='secondary'
        size='sm'
      >
        <SearchIcon className='h-5 w-5 text-muted-foreground' />
      </Button>
    </form>
  )
}

export default Search;
