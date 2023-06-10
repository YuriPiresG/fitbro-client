import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { User } from "./useGetMe";

interface Workout {
  id: number;
  name: string;
  description?: string;
  user: User;
}

export const useGetWorkouts = () => {
  return useQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      const response = await api.get<Workout[]>("/workout");
      return response.data;
    },
  });
};
