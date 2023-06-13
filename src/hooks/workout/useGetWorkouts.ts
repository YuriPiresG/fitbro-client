import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { User } from "../useGetMe";
import { Exercise } from "../exercise/useGetExercises";

export interface Workout {
  id: number;
  name: string;
  description?: string;
  user: User;
  exercises: Exercise[];
}

export const useGetWorkouts = () => {
  return useQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      const response = await api.get<Workout[]>(`/workout`);
      return response.data;
    },
  });
};
