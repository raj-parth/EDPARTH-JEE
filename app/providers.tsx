'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import { AppStoreProvider } from '@/lib/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AppStoreProvider>{children}</AppStoreProvider>
    </ThemeProvider>
  );
}
