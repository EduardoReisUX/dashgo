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
  Link as ChakraLink,
} from "@chakra-ui/react";

import NextLink from "next/link";
import { useState } from "react";

import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/axios";

import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error, refetch } = useUsers(page);

  const isDesktopVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      }
    );
  }

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

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size={"sm"}
                fontSize={"sm"}
                colorScheme={"pink"}
                leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
              >
                Criar novo usuário
              </Button>
            </NextLink>
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
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme={"pink"} />
                      </Td>
                      <Td>
                        <Box>
                          <ChakraLink
                            color={"purple.400"}
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                          >
                            <Text fontWeight={"bold"}>{user.name}</Text>
                          </ChakraLink>
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
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
