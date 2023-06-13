import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

interface Workout {
  name: string;
  description?: string;
  userId: number | undefined;
  exercisesId: string[];
}

export const useCreateWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Workout) => {
      await api.post("/workout", {
        ...data,
        exercisesId: data.exercisesId.map((id) => +id),
      });
      queryClient.refetchQueries(["workouts"]);
    },
  });
};
