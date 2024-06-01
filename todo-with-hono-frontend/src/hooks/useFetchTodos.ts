import { useQuery } from "@tanstack/react-query";

const useFetchTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
};

export default useFetchTodos;
