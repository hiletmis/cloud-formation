import React from "react";
import { VStack, Heading, Flex, Spacer, Text, Box } from "@chakra-ui/react";
import { COLORS } from "../data/colors";
import Title from "../Custom/Title";
import RadioButton from "../Custom/RadioButton";

const Hero = () => {
  return (
    <VStack
      spacing={4}
      bgColor={COLORS.main}
      minWidth={"350px"}
      maxWidth={"100%"}
      alignItems={"left"}
    >
      <Flex>
        <Heading size={"lg"}>Welcome</Heading>
        <Spacer />
      </Flex>
      <Text fontSize={"sm"}>Welcome to OEV Relay Playground.</Text>
    </VStack>
  );
};

export default Hero;
