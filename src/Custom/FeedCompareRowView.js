import { Text, Flex, VStack, Spacer } from "@chakra-ui/react";
import { CopyBlock, dracula } from "react-code-blocks";

import parserTypeScript from "prettier/parser-babel";
import prettier from "prettier/standalone";
import { getPath } from "../Helpers/Utils";

const FeedCompareRowView = ({ feed, servers }) => {

  const formatCode = (code) => {
    try {
      return prettier.format(code, {
        semi: true,
        parser: "babel",
        plugins: [parserTypeScript],
      });
    } catch (error) {
      return code;
    }
  };

  return (
    <VStack alignItems={"left"} spacing={4} p={5} width={"100%"}>
      <VStack
        bgColor={"yellow.200"}
        alignItems={"left"}
        spacing={4}
        p={2}
        width={"100%"}
      >
        <Text bgColor={"yellow.400"} p={2} fontSize={"md"} fontWeight={"bold"}>
          [DEPRECATED]
        </Text>
        <Text fontSize={"md"}>Get {feed.oldFeed.feed} price</Text>
        <Text fontSize={"md"} fontWeight={"bold"}>
          HTTP Request
        </Text>
        <Flex>
          <Text bgColor={"gray.300"} p={2} fontSize={"sm"} fontWeight={"bold"}>
            GET
          </Text>
          <Text bgColor={"gray.200"} p={2} fontSize={"sm"}>
            {getPath(feed.oldFeed, servers)}
          </Text>
        </Flex>
        <Text fontSize={"md"} fontWeight={"bold"}>
          Post Processing
        </Text>

        <CopyBlock
          text={formatCode(feed.oldFeed.code)}
          language={"javascript"}
          showLineNumbers={true}
          theme={dracula}
          codeBlock={true}
        />
      </VStack>

      <VStack
        bgColor={"green.200"}
        alignItems={"left"}
        spacing={4}
        p={2}
        width={"100%"}
      >
        <Text bgColor={"green.400"} p={2} fontSize={"md"} fontWeight={"bold"}>
          [ACTIVE]
        </Text>
        <Text fontSize={"md"}>Get {feed.newFeed.feed} price</Text>
        <Text fontSize={"md"} fontWeight={"bold"}>
          HTTP Request
        </Text>
        <Flex>
          <Text bgColor={"blue.300"} p={2} fontSize={"sm"} fontWeight={"bold"}>
            GET
          </Text>
          <Text bgColor={"blue.200"} p={2} fontSize={"sm"}>
            {getPath(feed.newFeed, servers)}
          </Text>
          <Spacer />
        </Flex>
        <Text fontSize={"md"} fontWeight={"bold"}>
          Post Processing
        </Text>

        <CopyBlock
          text={formatCode(feed.newFeed.code)}
          language={"javascript"}
          showLineNumbers={true}
          theme={dracula}
          codeBlock={true}
        />
      </VStack>
    </VStack>
  );
};

export default FeedCompareRowView;
