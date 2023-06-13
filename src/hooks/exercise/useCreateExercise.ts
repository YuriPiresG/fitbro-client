import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

interface CreateExercise {
  name: string;
  repetitions: number;
  series: number;
  weight: number;
  workoutId: number;
}

export const useCreateExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateExercise) => {
      await api.post("/exercises", data);
      queryClient.refetchQueries(["workouts"]);
    },
  });
};
