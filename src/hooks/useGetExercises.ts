import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Exercise {
  id: number;
  name: string;
  repetitions: number;
  series: number;
  weight: number;
}

export const useGetWorkouts = () => {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: async () => {
      const response = await api.get<Exercise[]>(`/exercise`);
      console.log(response.data);
      return response.data;
    },
  });
};
