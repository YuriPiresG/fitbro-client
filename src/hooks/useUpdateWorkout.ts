import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

interface Workout {
  name: string;
  description?: string;
  userId: number | undefined;
  exercisesId: number[];
}

export const useUpdateWorkout = () => {
  useQueryClient();
  return useMutation({
    mutationFn: async (data: Workout) => {
      await api.put("/workout", {
        ...data,
        exercisesId: data.exercisesId.map((id) => +id),
      });
    },
  });
};
