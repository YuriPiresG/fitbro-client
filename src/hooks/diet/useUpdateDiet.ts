import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

interface UpdateDiet {
  id: number;
  name: string;
  guide: string | undefined;
}

export function useUpdateDiet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateDiet) => {
      await api.put(`/diet/${data.id}`, data);
      queryClient.refetchQueries(["diet"]);
    },
  });
}
