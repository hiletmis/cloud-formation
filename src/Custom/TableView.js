import { Text, Flex, Spacer, VStack, Box } from "@chakra-ui/react";
import { COLORS } from "../data/colors";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Hero = ({ view, header, defaultState = false }) => {

    const [isOpen, setIsOpen] = useState(defaultState);

    return (
        <VStack alignItems={"left"} p={2} border={"1px"} borderColor={COLORS.main} width={"100%"}>
            <Box p={2} alignItems={"center"} borderRadius={"sm"} bgColor={COLORS.info}>
                <Flex alignItems={"center"}>
                    <Text fontWeight={"bold"} fontSize={"lg"}>{header}</Text>
                    <Spacer />
                    {
                        isOpen ?
                            <TriangleUpIcon width={"24px"} height={"24px"} cursor={"pointer"} onClick={() => setIsOpen(!isOpen)} />
                            :
                            <TriangleDownIcon width={"24px"} height={"24px"} cursor={"pointer"} onClick={() => setIsOpen(!isOpen)} />
                    }
                </Flex>
            </Box>
            {isOpen ? view : null}
        </VStack>
    );
};

export default Hero;
