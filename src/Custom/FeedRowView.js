import { Text, Flex, VStack, Button, Spacer } from "@chakra-ui/react";
import { CopyBlock, dracula } from "react-code-blocks";

import parserTypeScript from "prettier/parser-babel";
import prettier from "prettier/standalone";
import { useState } from "react";

const FeedRowView = ({ feed, servers }) => {

    const [response, setResponse] = useState(null)

    const formatCode = (code) => {
        return prettier.format(code, {
            parser: "babel",
            plugins: [parserTypeScript],
        });
    }

    const getPath = () => {
        const path = feed.preProcessingSpecificationsValue
        if (servers.length === 0) return path

        const server = servers[0]
        const url = server.url
        const basePath = server.basePath
        const pathWithBase = basePath + path
        return url + pathWithBase
    }

    const getPrice = () => {
        const url = getPath()

        fetch(url).then((res) => {
            setResponse(res)
        }).catch((error) => {
            setResponse(error)
        })
    }

    return (
        <VStack alignItems={"left"} spacing={4} p={2} width={"100%"}>
            <Text fontSize={"md"}>Get {feed.feed} price</Text>
            <Text fontSize={"md"} fontWeight={"bold"}>HTTP Request</Text>
            <Flex >
                <Text bgColor={"blue.300"} p={2} fontSize={"sm"} fontWeight={"bold"}>GET</Text>
                <Text bgColor={"blue.200"} p={2} fontSize={"sm"}>{getPath()}</Text>
                <Spacer />
                <Button colorScheme={"orange"} p={2} fontSize={"sm"} onClick={() => { getPrice() }} >Try it out</Button>
            </Flex>
            {
                response == null ? null :
                    <VStack alignItems={"left"} width={"100%"}>
                        <Text fontSize={"md"} fontWeight={"bold"}>Response</Text>
                        <CopyBlock
                            text={response}
                            language={"javascript"}
                            showLineNumbers={true}
                            theme={dracula}
                            codeBlock={true}
                        />
                    </VStack>
            }
            <Text fontSize={"md"} fontWeight={"bold"}>Post Processing</Text>
            <CopyBlock
                text={formatCode(feed.code)}
                language={"javascript"}
                showLineNumbers={true}
                theme={dracula}
                codeBlock={true}
            />


        </VStack>
    );
};

export default FeedRowView;
