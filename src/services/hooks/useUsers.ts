import { useQuery } from "react-query";
import { api } from "../axios";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get("/users");

  const users = data.users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return users;
}

export function useUsers() {
  // useQuery fetch and cache fake data
  // from mirage in services/mirage
  // stale while revalidate — revalidate on focus
  // data will be fresh for 5 seconds
  return useQuery("users", getUsers, {
    staleTime: 1000 * 5,
  });
}
