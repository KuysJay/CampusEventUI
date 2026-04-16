import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./AuthContext";
import { EventProvider } from "./EventContext";
import { UserProvider } from "./UserContext";
import { ThemeProvider } from "./ThemeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export function AppProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <EventProvider>
            <UserProvider>{children}</UserProvider>
          </EventProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
