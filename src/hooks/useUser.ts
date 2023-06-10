import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface User {
  id: number;
  name: string;
}

export const useUser = () => {
  const accessToken = localStorage.getItem("access_token");
  const response = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get<User>("/users/me");
      return response.data;
    },
    enabled: !!accessToken,
  });
  return response.data;
};
