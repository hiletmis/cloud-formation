import { Flex, Heading, Image } from "@chakra-ui/react";
import { COLORS } from "../data/colors";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Flex
      width={"100%"}
      bg={COLORS.header}
      boxShadow="lg"
      flexDirection={"column"}
    >
      <Flex as="header" align="center" justify="space-between" p={4}>
        <Flex align="flex-start" cursor="pointer" gap={"12px"}>
          <Image src={`/logo.svg`} width={"25px"} height={"25px"} />
          <Heading size="md">Nodary Push API Review Tool</Heading>
        </Flex>
        <Flex align="flex-end" gap={"12px"}>
          <Link to={"/"}>
            <Image
              src={`https://img.icons8.com/ios/452/home.png`}
              width={"25px"}
              height={"25px"}
            />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
