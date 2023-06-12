import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useGetMe } from "./useGetMe";

export interface Exercise {
  id: number;
  name: string;
  repetitions: number;
  series: number;
  weight: number;
}

export const useGetExercises =  () => {

  return useQuery({
    queryKey: ["exercises"],
    queryFn: async () => {
      const response = await api.get<Exercise[]>(`/exercises`);
      return response.data;
    },
  });
};
