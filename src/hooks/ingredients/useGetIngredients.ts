import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { Diet } from "../diet/useGetDiet";

export interface Ingredient {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  diet: Diet;
}

export const useGetWorkouts = () => {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: async () => {
      const response = await api.get<Ingredient[]>(`/ingredients`);
      return response.data;
    },
  });
};
