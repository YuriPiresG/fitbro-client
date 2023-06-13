import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

export function useDeleteWorkout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/workout/${id}`);
      queryClient.refetchQueries(["workouts"]);
    },
  });
}
