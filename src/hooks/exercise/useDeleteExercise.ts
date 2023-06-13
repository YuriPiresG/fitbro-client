import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

export function useDeleteExercise() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/exercises/${id}`);
      queryClient.refetchQueries(["workouts"]);
    },
  });
}
