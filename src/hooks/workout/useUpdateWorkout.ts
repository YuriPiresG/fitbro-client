import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

export interface UpdateWorkout {
  id: number;
  name: string;
  description?: string;
  userId: number | undefined;
  exercisesId: string[];
}

export function useUpdateWorkout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateWorkout) => {
      await api.put(`/workout/${data.id}`, {
        ...data,
        exercisesId: data.exercisesId.map((id) => +id),
      });
      queryClient.refetchQueries(["workouts"]);
    },
  });
}
