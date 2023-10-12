import React from "react";
import { VStack, Flex, Text } from "@chakra-ui/react";
import { COLORS } from "../data/colors";
import Title from "../Custom/Title";
import RadioButton from "../Custom/RadioButton";

const Hero = () => {
  return (
    <Flex spacing={4} height={"90vh"} overflow={"scroll"}>
      <VStack
        spacing={4}
        width={"100%"}
        alignItems={"center"}
        justifyItems={"stretch"}
      >
        <VStack
          p={3}
          bgColor={COLORS.table}
          borderRadius={"sm"}
          boxShadow="md"
          spacing={4}
          minWidth={"500px"}
          maxWidth={"1000px"}
          alignItems={"left"}
          justifyItems={"center"}
        >
          <Title
            header={"Select an action to continue"}
            isLoading={false}
            buttonVisibility={false}
          />

          <Flex justifyContent={"center"} marginBottom={"20px"}>
            <RadioButton
              link={"/upload"}
              bgColor={COLORS.info}
              description={"Upload Config"}
              icon={"https://img.icons8.com/ios/452/upload.png"}
            />
            <RadioButton
              link={"/compare"}
              bgColor={COLORS.info}
              description={"Compare Config"}
              icon={"https://img.icons8.com/ios/452/compare.png"}
            />
          </Flex>
        </VStack>
        <Text fontSize={"xs"}>Version: 0.0.1b</Text>
      </VStack>
    </Flex>
  );
};

export default Hero;
