import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

export function useDeleteDiet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/diet/${id}`);
      queryClient.refetchQueries(["diet"]);
    },
  });
}
