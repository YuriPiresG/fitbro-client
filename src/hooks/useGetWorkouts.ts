import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { User, useGetMe } from "./useGetMe";

interface Workout {
  id: number;
  name: string;
  description?: string;
  user: User;
}

export const useGetWorkouts = () => {
  const user = useGetMe();
  return useQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      const response = await api.get<Workout[]>(`/workout`);
      console.log(response.data);
      return response.data;
    },
  });
};
