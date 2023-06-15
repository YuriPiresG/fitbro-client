import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

interface UpdateIngredient {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
}

export function useUpdateIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateIngredient) => {
      await api.put(`/ingredients/${data.id}`, data);
      queryClient.refetchQueries(["diet"]);
    },
  });
}
