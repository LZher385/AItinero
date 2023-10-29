'use client';

import { ReactNode } from 'react';
import ConvexClientProvider from './ConvexClientProvider';
import { ThemeProvider } from './ThemeProvider';

export default function RootWrapper({ children }: { children: ReactNode }) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
