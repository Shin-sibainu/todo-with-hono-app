import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import TodoApp from "./components/TodoApp";

export type TodoType = {
  id?: number;
  status?: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  );
}

export default App;
