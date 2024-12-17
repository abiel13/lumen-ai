'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const useUpdateParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (key: string, value: string): void => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return updateParams;
};

export default useUpdateParams;
