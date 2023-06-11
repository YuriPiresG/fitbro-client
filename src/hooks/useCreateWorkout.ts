import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

interface Workout {
  name: string;
  description?: string;
  userId: number | undefined;
}

export const useCreateWorkout = () => {
  useQueryClient();
  return useMutation({
    mutationFn: async (data: Workout) => {
      await api.post("/workout", data);
    },
  });
};
