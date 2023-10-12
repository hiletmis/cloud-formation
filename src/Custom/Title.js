import React from "react";
import { Heading, Flex, Spacer, VStack, Button } from "@chakra-ui/react";
import { ColorRing } from "react-loader-spinner";
import { COLORS } from "../data/colors";

const Hero = ({
  isLoading,
  header,
  onClick,
  buttonText,
  buttonVisibility = true,
}) => {
  return (
    <VStack p={3} alignItems={"left"} bgColor={COLORS.main}>
      <Flex>
        <Heading size={"lg"}>{header}</Heading>
        <Spacer />
        <ColorRing
          height="32px"
          width="32px"
          radius="9"
          color="green"
          ariaLabel="loading"
          visible={isLoading}
        />
        {!buttonVisibility ? null : (
          <Button colorScheme="orange" size="sm" onClick={onClick}>
            {buttonText}
          </Button>
        )}
      </Flex>
    </VStack>
  );
};

export default Hero;
