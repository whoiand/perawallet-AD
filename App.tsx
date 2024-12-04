import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RepoList } from "./src/screens/RepoList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/navigation/AppStack/AppStack";

const queryClient = new QueryClient({
  defaultOptions: { queries: { experimental_prefetchInRender: true } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
