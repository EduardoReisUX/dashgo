import { Flex, Box, Avatar, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align={"center"}>
      <Box mr={"4"} textAlign={"right"}>
        <Text>Eduardo Fernandes</Text>
        <Text color={"gray.300"} fontSize={"small"}>
          ducabruno09@hotmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Eduardo Fernandes"
        src="https://github.com/EduardoReisUX.png"
      />
    </Flex>
  );
}
