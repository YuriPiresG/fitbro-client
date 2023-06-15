import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

interface CreateIngredient {
  name: string;
  protein: number;
  calories: number;
  carbs: number;
  dietId: number;
}

export const useCreateIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateIngredient) => {
      await api.post("/ingredients", data);
      queryClient.refetchQueries(["diet"]);
    },
  });
};
