import { VStack } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";

const Hero = ({ steps }) => {
    return (
        <VStack p={2} spacing={0} direction="row" align="left">
            {
                steps.map((step, index) => {
                    return (
                        <Box p={1} key={index} bgColor={step.color} borderRadius={"10"} width={"100%"} height={"100%"}>
                            <Text fontSize={"sm"}>- {step}</Text>
                        </Box>
                    )
                })
            }
        </VStack>
    );
};

export default Hero;
