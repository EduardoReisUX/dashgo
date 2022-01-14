import {
  Box,
  Flex,
  Heading,
  Icon,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";

import Link from "next/link";

import { useQuery } from "react-query";

import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
  // useQuery fetch and cache fake data
  // from mirage in services/mirage
  // stale while revalidate — revalidate on focus
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    "users",
    async () => {
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();

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
    },
    {
      staleTime: 1000 * 5, // data will be fresh for 5 seconds
    }
  );

  const isDesktopVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />

      <Flex w={"100%"} my={6} maxW={1480} mx={"auto"} px={"6"}>
        <Sidebar />

        <Box flex={"1"} borderRadius={8} bg={"gray.800"} p={"8"}>
          <Flex mb={"8"} justify={"space-between"} align={"center"}>
            <Heading size={"lg"} fontWeight={"normal"}>
              Usuários
              {!isLoading && isFetching && (
                <Spinner size={"sm"} color="gray.500" ml={4} />
              )}
            </Heading>

            <Button
              size={"sm"}
              variant={"link"}
              fontSize={"sm"}
              colorScheme={"pink"}
              p={{ base: 2, lg: 4 }}
              mr={4}
              ml={"auto"}
              onClick={() => refetch()}
            >
              Atualizar dados
            </Button>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size={"sm"}
                fontSize={"sm"}
                colorScheme={"pink"}
                leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
              >
                Criar novo usuário
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify={"center"}>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify={"center"}>
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme={"whiteAlpha"}>
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color={"gray.300"} width={"8"}>
                      <Checkbox colorScheme={"pink"} />
                    </Th>
                    <Th color={"gray.300"}>Usuário</Th>
                    {isDesktopVersion && (
                      <Th color={"gray.300"}>Data de cadastro</Th>
                    )}
                    <Th color={"gray.300"} width={"8"}></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme={"pink"} />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight={"bold"}>{user.name}</Text>
                          <Text fontSize={"sm"} color={"gray.300"}>
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isDesktopVersion && <Td>{user.createdAt}</Td>}
                      <Td>
                        <Button
                          size={"sm"}
                          fontSize={"sm"}
                          colorScheme={"pink"}
                          variant={"link"}
                          leftIcon={<Icon as={RiPencilLine} fontSize={"16"} />}
                        >
                          Editar
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
