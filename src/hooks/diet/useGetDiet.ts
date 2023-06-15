import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { User } from "../useGetMe";
import { Ingredient } from "../ingredients/useGetIngredients";

export interface Diet {
  id: number;
  name: string;
  guide: string;
  user: User;
  ingredients: Ingredient[];
}

export const useGetDiet = () => {
  return useQuery({
    queryKey: ["diet"],
    queryFn: async () => {
      const response = await api.get<Diet[]>(`/diet`);
      return response.data;
    },
  });
};
