import { Text, Flex, VStack, Button, Spacer } from "@chakra-ui/react";
import { CopyBlock, dracula } from "react-code-blocks";

import parserTypeScript from "prettier/parser-babel";
import prettier from "prettier/standalone";
import { useState } from "react";
import { getPath, getApiCallParameters } from "../Helpers/Utils";
import { postProcessing } from "../Helpers/PostProcessing";
import TableView from "./TableView";

const FeedRowView = ({ endpoint, feed, servers }) => {
  const [postProcessResult, setPostProcessResult] = useState(null);

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

  const formatParameters = (parameters) => {
    const apiCallParameters = getApiCallParameters(
      feed.preProcessingSpecificationsValue
    );

    const formattedParameters = [];
    Object.keys(parameters).forEach((key) => {
      const parameter = parameters[key];
      formattedParameters.push({
        name: parameter.name,
        type:
          parameter.operationParameter == null
            ? "string"
            : parameter.operationParameter.in,
        value:
          parameter.name === "path"
            ? apiCallParameters.path
            : apiCallParameters.parameters[parameter.name],
        required: parameter.required ? "Yes" : "No",
      });
    });

    formattedParameters.sort((a, b) => {
      console.log(a, b);
      if (b.value === undefined && a.value !== undefined) return -1;
      return 0;
    });

    return formattedParameters;
  };

  const getPrice = () => {
    const url = getPath(feed, servers);

    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        postProcess(res);
      });
  };

  const postProcess = (response) => {
    const apiCallParameters = getApiCallParameters(
      feed.preProcessingSpecificationsValue
    );
    postProcessing(
      response,
      apiCallParameters.parameters,
      endpoint,
      setPostProcessResult
    );
  };

  const getColor = (method, darker) => {
    if (method === "GET") return darker ? "blue.300" : "blue.200";
    if (method === "POST") return darker ? "green.300" : "green.200";
    return "yellow.300";
  };

  return (
    <VStack alignItems={"left"} spacing={4} p={2} width={"100%"}>
      <Text fontSize={"md"}>Get {feed.feed} price</Text>
      <Text fontSize={"md"} fontWeight={"bold"}>
        HTTP Request
      </Text>
      <Flex>
        <Text
          bgColor={getColor(endpoint.operation.method.toUpperCase(), true)}
          p={2}
          fontSize={"sm"}
          fontWeight={"bold"}
        >
          {endpoint.operation.method.toUpperCase()}
        </Text>
        <Text
          bgColor={getColor(endpoint.operation.method.toUpperCase(), false)}
          p={2}
          fontSize={"sm"}
        >
          {getPath(feed, servers)}
        </Text>
        <Spacer />
      </Flex>
      <Text fontSize={"md"} fontWeight={"bold"}>
        Parameters
      </Text>
      <TableView
        parameters={formatParameters(endpoint.parameters)}
        headers={[
          { key: "name", value: "Name" },
          { key: "type", value: "Type" },
          { key: "value", value: "Value" },
          { key: "required", value: "Required" },
        ]}
      />
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
      <VStack alignItems={"left"} width={"100%"}>
        <Button
          colorScheme={"orange"}
          p={2}
          fontSize={"sm"}
          h={"50px"}
          w={"100px"}
          onClick={() => {
            getPrice();
          }}
        >
          Try it out
        </Button>
      </VStack>
      {postProcessResult == null ? null : (
        <VStack alignItems={"left"} width={"100%"}>
          <Text fontSize={"md"} fontWeight={"bold"}>
            Result
          </Text>
          <CopyBlock
            text={postProcessResult}
            language={"json"}
            showLineNumbers={true}
            theme={dracula}
            codeBlock={true}
          />
        </VStack>
      )}
    </VStack>
  );
};

export default FeedRowView;
