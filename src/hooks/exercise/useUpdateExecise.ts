import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

export interface UpdateExercise {
  id: number;
  name: string;
  repetitions: number;
  series: number;
  weight: number;
}

export function useUpdateExercise() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateExercise) => {
      await api.put(`/exercises/${data.id}`, data);
      queryClient.refetchQueries(["workouts"]);
    },
  });
}
