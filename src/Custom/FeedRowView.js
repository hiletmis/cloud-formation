import { Text, Flex, VStack, Button, Spacer } from "@chakra-ui/react";
import { CopyBlock, dracula } from "react-code-blocks";

import parserTypeScript from "prettier/parser-babel";
import prettier from "prettier/standalone";
import { useState } from "react";
import { getPath } from "../Helpers/Utils";

const FeedRowView = ({ feed, servers }) => {
  const [response, setResponse] = useState(null);

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

  const getPrice = () => {
    const url = getPath(feed, servers);

    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        setResponse(JSON.stringify(res, null, 2));
      })
      .catch((error) => {
        setResponse(error);
      });
  };

  return (
    <VStack alignItems={"left"} spacing={4} p={2} width={"100%"}>
      <Text fontSize={"md"}>Get {feed.feed} price</Text>
      <Text fontSize={"md"} fontWeight={"bold"}>
        HTTP Request
      </Text>
      <Flex>
        <Text bgColor={"blue.300"} p={2} fontSize={"sm"} fontWeight={"bold"}>
          GET
        </Text>
        <Text bgColor={"blue.200"} p={2} fontSize={"sm"}>
          {getPath(feed, servers)}
        </Text>
        <Spacer />
        <Button
          colorScheme={"orange"}
          p={2}
          fontSize={"sm"}
          h={"32px"}
          onClick={() => {
            getPrice();
          }}
        >
          Try it out
        </Button>
      </Flex>
      {response == null ? null : (
        <VStack alignItems={"left"} width={"100%"}>
          <Text fontSize={"md"} fontWeight={"bold"}>
            Response
          </Text>
          <CopyBlock
            text={formatCode(response)}
            language={"javascript"}
            showLineNumbers={true}
            theme={dracula}
            codeBlock={true}
          />
        </VStack>
      )}
      <Text fontSize={"md"} fontWeight={"bold"}>
        Post Processing
      </Text>
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
