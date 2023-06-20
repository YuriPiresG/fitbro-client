import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { User } from "../useGetMe";

export interface Measurement {
  id: number;
  date: string;
  user: User;
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

export const useGetMeasurements = () => {
  return useQuery({
    queryKey: ["measurements"],
    queryFn: async () => {
      const response = await api.get<Measurement[]>(`/measurements`);
      return response.data;
    },
  });
};
