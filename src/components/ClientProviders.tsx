'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CookieBanner from '@/components/CookieBanner';
import GlobalBackground from '@/components/GlobalBackground';
import { ThemeProvider } from '@/components/ThemeProvider';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes stale time
            gcTime: 1000 * 60 * 15, // 15 minutes garbage collection time
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GlobalBackground />
        {children}
        <CookieBanner />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

