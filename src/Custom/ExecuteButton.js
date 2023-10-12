import React from "react";
import { Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Hero = ({
  link,
  isDisabled,
  onClick,
  text,
  minWidth = "200px",
  height = "50px",
}) => {
  const navigate = useNavigate();

  function handleClick(route) {
    navigate(route);
  }

  return (
    <VStack spacing={4} w="100%">
      <Button
        colorScheme="orange"
        variant="outline"
        borderWidth="1px"
        size="md"
        height={height}
        minWidth={minWidth}
        isDisabled={isDisabled}
        onClick={() => {
          onClick != null ? onClick() : handleClick(link);
        }}
      >
        {text}
      </Button>
    </VStack>
  );
};

export default Hero;
