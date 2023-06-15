import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

export function useDeleteIngredient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/ingredients/${id}`);
      queryClient.refetchQueries(["diet"]);
    },
  });
}
