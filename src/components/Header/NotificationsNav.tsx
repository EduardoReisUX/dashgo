import { HStack, Icon, Link } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

export function NotificationsNav() {
  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py={"1"}
      color={"gray.300"}
      borderRightWidth={1}
      borderColor={"gray.700"}
    >
      <Link display={"flex"} align={"center"}>
        <Icon as={RiNotificationLine} fontSize={20} />
      </Link>
      <Link display={"flex"} align={"center"}>
        <Icon as={RiUserAddLine} fontSize={20} />
      </Link>
    </HStack>
  );
}
