"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const useUpdateParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateParams = async (key: string, value: string): Promise<void> => {
    // Create a promise that resolves once router.replace is done
    await new Promise<void>((resolve) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Use current pathname to maintain route context
      const newPath = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(newPath, { scroll: false });
      resolve();
    });
  };

  return updateParams;
};

export default useUpdateParams;
