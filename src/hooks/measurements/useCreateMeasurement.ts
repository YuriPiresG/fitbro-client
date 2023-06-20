import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

interface CreateMeasurement {
  date: string | Date;
  userId: number;
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
const formatDate = (date: string | number | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


export const useCreateMeasurement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateMeasurement) => {
      await api.post("/measurements", {
        ...data,
        date: formatDate(data.date),
      });
      queryClient.refetchQueries(["measurements"]);
    },
  });
};
