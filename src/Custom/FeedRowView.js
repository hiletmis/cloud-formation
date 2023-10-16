import { Text, Flex, VStack, Button, Spacer } from "@chakra-ui/react";
import { CopyBlock, dracula } from "react-code-blocks";

import parserTypeScript from "prettier/parser-babel";
import prettier from "prettier/standalone";
import { useEffect, useState } from "react";
import {
  getPath,
  getApiCallParameters,
  pathFromPrePreProcessing,
} from "../Helpers/Utils";
import { postProcessing, preProcessing } from "../Helpers/PostProcessing";
import TableView from "./TableView";

const FeedRowView = ({ endpoint, feed, servers, tryit = true }) => {
  const [postProcessResult, setPostProcessResult] = useState(null);
  const [preProcessResult, setPreProcessResult] = useState(null);
  const [error, setError] = useState(null);

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
    try {
      const apiCallParameters = getApiCallParameters(
        feed.preProcessingSpecificationsValue,
        setError
      );

      if (apiCallParameters === null) return [];

      const formattedParameters = [];
      Object.keys(parameters).forEach((key) => {
        const parameter = parameters[key];
        if (parameter.name === "path") return;
        const data =
          parameter.name === "path"
            ? apiCallParameters.path
            : apiCallParameters.parameters[parameter.name];

        if (data === undefined) {
          return;
        }

        formattedParameters.push({
          name: parameter.name,
          type:
            parameter.operationParameter == null
              ? "string"
              : parameter.operationParameter.in,
          value: data,
          required: parameter.required ? "Yes" : "No",
        });
      });

      formattedParameters.sort((a, b) => {
        if (b.value === undefined && a.value !== undefined) return -1;
        return 0;
      });

      return formattedParameters;
    } catch (error) {
      setError(error);
    }
  };

  const preProcess = () => {
    preProcessing(endpoint, { name: feed.feed }, setPreProcessResult);
  };

  useEffect(() => {
    if (preProcessResult == null) return;
    if (feed.preProcessingSpecificationsValue == null) return;

    const url = pathFromPrePreProcessing(preProcessResult, servers);
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        postProcessing(
          res,
          { name: feed.feed },
          endpoint,
          setPostProcessResult
        );
      });
  }, [endpoint, feed, preProcessResult, servers]);

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
          {error !== null ? "error" : getPath(feed, servers, setError)}
        </Text>
        <Spacer />
      </Flex>
      <Text fontSize={"md"} fontWeight={"bold"}>
        Parameters
      </Text>
      {error !== null ? (
        "error"
      ) : (
        <TableView
          parameters={formatParameters(endpoint.parameters)}
          headers={[
            { key: "name", value: "Name" },
            { key: "type", value: "Type" },
            { key: "value", value: "Value" },
            { key: "required", value: "Required" },
          ]}
        />
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

      <VStack alignItems={"left"} width={"100%"}>
        {
          !tryit ? null :
            <Button
              colorScheme={"orange"}
              p={2}
              fontSize={"sm"}
              h={"50px"}
              w={"100px"}
              onClick={() => {
                preProcess();
              }}
            >
              Try it out
            </Button>
        }

      </VStack>
      {postProcessResult == null ? null : (
        <VStack alignItems={"left"} width={"100%"}>
          <Text fontSize={"md"} fontWeight={"bold"}>
            Result
          </Text>
          <CopyBlock
            text={formatCode(postProcessResult)}
            language={"json"}
            showLineNumbers={true}
            theme={dracula}
            codeBlock={true}
          />
        </VStack>
      )}
      {error == null ? null : (
        <VStack alignItems={"left"} width={"100%"}>
          <Text fontSize={"md"} fontWeight={"bold"}>
            Error
          </Text>
          <CopyBlock
            text={formatCode(error)}
            language={"json"}
            showLineNumbers={false}
            theme={dracula}
            codeBlock={true}
          />
        </VStack>
      )}
    </VStack>
  );
};

export default FeedRowView;
