"use client";
import { useRouter, useSearchParams } from "next/navigation";

const useUpdateParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = async (key: string, value: string): Promise<void> => {
    // Create a promise that resolves once router.replace is done
    await new Promise<void>((resolve) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.replace(`?${params.toString()}`, { scroll: false });
      resolve();
    });
  };

  return updateParams;
};

export default useUpdateParams;
