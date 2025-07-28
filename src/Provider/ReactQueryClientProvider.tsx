"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";

interface Props {
  children: ReactNode;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevents refetching on window focus by default
      retry: 1, // Retries failed queries once by default
    },
  },
});

export default function ReactQueryClientProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
