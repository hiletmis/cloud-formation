import { Text, Flex, Spacer, VStack, Box } from "@chakra-ui/react";
import { COLORS } from "../data/colors";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useState } from "react";

const ExpandableView = ({ view, header, defaultState = false, status = 0 }) => {
  const [isOpen, setIsOpen] = useState(defaultState);

  const getColor = () => {
    switch (status) {
      case 0:
        return COLORS.info;
      case 1:
        return "green.300";
      case 2:
        return "red.300";
      case 3:
        return "blue.300";
      case 4:
        return "purple.300";
      case 5:
        return COLORS.main;
      default:
        return "gray.300";
    }
  };

  return (
    <VStack
      alignItems={"left"}
      p={2}
      borderColor={COLORS.main}
      boxShadow={"sm"}
      width={"100%"}
    >
      <Box p={2} alignItems={"center"} borderRadius={"sm"} bgColor={getColor()}>
        <Flex alignItems={"center"}>
          <Text fontWeight={"bold"} fontSize={"lg"}>
            {header}
          </Text>
          <Spacer />
          {isOpen ? (
            <TriangleUpIcon
              width={"24px"}
              height={"24px"}
              cursor={"pointer"}
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <TriangleDownIcon
              width={"24px"}
              height={"24px"}
              cursor={"pointer"}
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </Flex>
      </Box>
      {isOpen ? view : null}
    </VStack>
  );
};

export default ExpandableView;
