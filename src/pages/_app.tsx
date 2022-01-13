import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";

import { makeServer } from "../services/mirage";

import { QueryClient, QueryClientProvider } from "react-query";

// For debugging react-query
import { ReactQueryDevtools } from "react-query/devtools";

// If it's a development server, start miragejs fake api
if (process.env.NODE_ENV === "development") {
  makeServer();
}

// react-query needs a QueryClientProvider to work
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
