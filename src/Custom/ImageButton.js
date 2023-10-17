import { Flex, VStack } from "@chakra-ui/react";
import { Box, Text, Image } from "@chakra-ui/react";

const Hero = ({ onClick, bgColor = "white", description, src, inW = "150px", outW = "150px" }) => {
    return (
        <VStack onClick={() => onClick()} cursor={"pointer"} spacing={0} direction="row" align="left">
            <Box alignItems={"center"} width={outW} height={outW}>
                <Flex
                    justify={"center"}
                    bgColor={bgColor}
                    width={outW}
                    height={outW}
                    borderRadius={"sm"}
                    boxShadow="md"
                    alignItems={"center"}
                >
                    <Image borderRadius={"lg"} src={src} width={inW} height={inW} />
                </Flex>
            </Box>
            {
                description === null ? null :
                    <Box
                        p={"1"}
                        borderRadius={"10"}
                        alignItems={"center"}
                        width={outW}
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
            }

        </VStack>
    );
};

export default Hero;
