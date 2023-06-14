import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

interface CreateDiet {
  name: string;
  guide: string;
  userId: number;
}

export const useCreateDiet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateDiet) => {
      await api.post("/diet", data);
      queryClient.refetchQueries(["diet"]);
    },
  });
};
