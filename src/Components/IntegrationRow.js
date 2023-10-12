import { VStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { COLORS } from "../data/colors";

const Hero = () => {
  return (
    <VStack spacing={0} direction="row" align="left">
      <Box
        p={"1"}
        border={"1px"}
        borderColor={COLORS.bg}
        bgColor={COLORS.table}
        borderRadius={"10"}
        width={"100%"}
        height={"170px"}
      ></Box>
    </VStack>
  );
};

export default Hero;
