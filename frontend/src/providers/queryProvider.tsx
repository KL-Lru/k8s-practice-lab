import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
      useErrorBoundary: true,
    },
    mutations: {
      retry: false,
    },
  },
});

export const QueryProvider: React.FC = (props) => {
  return (
    <QueryClientProvider client = {queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};
