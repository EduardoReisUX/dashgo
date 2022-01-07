import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";

import { Logo } from "./Logo";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { Search } from "./Search";

export function Header() {
  const { onOpen } = useSidebarDrawer();

  const isDesktopVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w={"100%"}
      maxW={1480}
      h={"20"}
      mx={"auto"}
      mt="4"
      px="6"
      align={"center"}
    >
      {!isDesktopVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize={"24"}
          variant={"unstyled"}
          onClick={onOpen}
          mt={"3"}
          mr={"2"}
        />
      )}

      <Logo />
      {isDesktopVersion && <Search />}

      <Flex align={"center"} ml={"auto"}>
        <NotificationsNav />
        <Profile showProfileData={isDesktopVersion} />
      </Flex>
    </Flex>
  );
}
