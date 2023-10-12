import { Flex, VStack } from "@chakra-ui/react";
import { Box, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Hero = ({ link, bgColor, description, icon }) => {
  return (
    <Link to={link}>
      <VStack cursor={"pointer"} spacing={0} direction="row" align="left">
        <Box p={"1"} alignItems={"center"} width={"150px"} height={"150px"}>
          <Flex
            justify={"center"}
            bgColor={bgColor}
            width={"100%"}
            height={"100%"}
            borderRadius={"sm"}
            boxShadow="md"
            alignItems={"center"}
          >
            <Image src={icon} width={"60px"} height={"60px"} />
          </Flex>
        </Box>
        <Box
          p={"1"}
          borderRadius={"10"}
          alignItems={"center"}
          width={"150px"}
          height={"50px"}
        >
          <Flex
            justify={"center"}
            bgColor={bgColor}
            width={"100%"}
            height={"100%"}
            borderRadius={"sm"}
            boxShadow="md"
            alignItems={"center"}
          >
            <Text fontSize={"md"} fontWeight={"bold"}>
              {description}
            </Text>
          </Flex>
        </Box>
      </VStack>
    </Link>
  );
};

export default Hero;
