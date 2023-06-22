import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { formatDate } from "./useCreateMeasurement";

interface UpdateMeasurement {
  id: number;
  date: string | Date;
  weight: number;
  height: number;
  bodyFat: number;
  armL: number;
  armR: number;
  forearmL: number;
  forearmR: number;
  chest: number;
  waist: number;
  hips: number;
  thighL: number;
  thighR: number;
  calfL: number;
  calfR: number;
  back: number;
  shoulders: number;
}

export function useUpdateMeasurement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateMeasurement) => {
      await api.put(`/measurements/${data.id}`, {
        ...data,
        date: formatDate(data.date),
      });
      queryClient.refetchQueries(["measurements"]);
    },
  });
}
