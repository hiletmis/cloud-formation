import { Flex, VStack } from "@chakra-ui/react";
import { Box, Text, Image } from "@chakra-ui/react";

const Hero = ({ onClick, bgColor, description, icon }) => {
    return (
        <VStack onClick={() => onClick()} cursor={"pointer"} spacing={0} direction="row" align="left">
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
                    <Image borderRadius={"lg"} src={icon} width={"100px"} height={"100px"} />
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
    );
};

export default Hero;
