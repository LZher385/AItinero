'use client';

import { ReactNode } from 'react';
import ConvexClientProvider from './ConvexClientProvider';
import { ThemeProvider } from './ThemeProvider';

export default function RootWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ThemeProvider>
  );
}
