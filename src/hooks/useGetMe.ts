import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface User {
  id: number;
  username: string;
}

export const useGetMe = () => {
  localStorage.getItem("access_token");
  const response = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get<User>("/users/me");
      return response.data;
    },
  });
  return response.data;
};
