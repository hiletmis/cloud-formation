import React from "react";
import { VStack, Flex, Spacer, Text, Box } from "@chakra-ui/react";
import { COLORS } from "../data/colors";
import { CopyBlock, dracula } from "react-code-blocks";
import ExpandableView from "../Custom/ExpandableView";

const Hero = ({ endpoint }) => {
    const formatCode = (code) => {
        let tmp = code.replaceAll(" = {", " = {\n\t\t\t")
        tmp = tmp.replaceAll("\\n", "")

        tmp = tmp.replaceAll("};", "\n\t\t};")
        tmp = tmp.replaceAll("\":{", "\":\t{")
        tmp = tmp.replaceAll("\"(_input) => {\\n              return _input.price\\n            }\\n            \"", "\t(_input) => {return _input.price}")
        tmp = tmp.replaceAll("            ", "")
        return tmp.replaceAll(",\"", ",\n\t\t\t\"")
    }

    return (
        <VStack alignItems={"left"}>
            <Flex alignItems={"center"} p={2} bgColor={COLORS.main} width={"100%"}>
                <Text fontWeight={"bold"} fontSize={"xl"}>{endpoint.name}</Text>
                <Spacer />
                <Box p={2} alignItems={"center"} borderRadius={"sm"} bgColor={endpoint.operation.method === "get" ? "blue.300" : "green.300"}>
                    <Text fontWeight={"bold"} fontSize={"md"}>{String(endpoint.operation.method).toUpperCase()}</Text>
                </Box>
            </Flex>
            <ExpandableView
                view={
                    <VStack>
                        <Flex alignItems={"center"} p={1} bgColor={COLORS.info2} width={"100%"}>
                            <Text fontWeight={"bold"} fontSize={"md"}>{"Parameter name"}</Text>
                            <Spacer />
                            <Text fontWeight={"bold"} fontSize={"md"}>{"Required"}</Text>
                        </Flex>
                        {
                            endpoint.parameters.map((parameter, index) => (
                                <Flex key={index} alignItems={"center"} p={1} bgColor={COLORS.app} width={"100%"}>
                                    <Text fontWeight={"bold"} fontSize={"md"}>{parameter.name}</Text>
                                    <Spacer />
                                    <Text fontSize={"md"}>{parameter.required ? "true" : "false"}</Text>
                                </Flex>
                            ))
                        }
                    </VStack>
                }
                header={"Parameters"}
                defaultState={true}
            />
            <ExpandableView
                view={
                    endpoint.preProcessingSpecifications.map((code, index) => (
                        <VStack key={index} alignItems={"left"} width={"100%"}>
                            <CopyBlock
                                text={formatCode(code.value)}
                                language={"javascript"}
                                showLineNumbers={true}
                                theme={dracula}
                                codeBlock={false}
                            />
                        </VStack>
                    ))
                }
                header={"Pre Processing Specifications"}
            />
            <ExpandableView
                view={
                    endpoint.postProcessingSpecifications.map((code, index) => (
                        <VStack key={index} alignItems={"left"} width={"100%"}>
                            <CopyBlock
                                text={formatCode(code.value)}
                                language={"javascript"}
                                showLineNumbers={true}
                                theme={dracula}
                                codeBlock={false}
                            />
                        </VStack>

                    ))
                }
                header={"Post Processing Specifications"}
            />

        </VStack>
    );
};

export default Hero;
