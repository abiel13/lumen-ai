'use client';

import { useSearchParams } from 'next/navigation';

const useGetParam = () => {
  const searchParams = useSearchParams();

  const getParamValue = (key: string): string | null => {
    return searchParams.get(key); // Returns the value or null if it doesn't exist
  };

  const hasParam = (key: string): boolean => {
    return searchParams.has(key); // Returns true if the key exists, otherwise false
  };

  return { getParamValue, hasParam };
};

export default useGetParam;
