import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../axios";

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("/users", {
    params: {
      page,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: new Date(user.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return { users, totalCount };
}

export function useUsers(page: number) {
  // It's important identify every page of users so that the
  // react-query doesn't think it's the same data as "users"
  // ["users", 1], ["users", 2], ["users", 3], ...
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
