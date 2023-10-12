import { VStack, Flex } from "@chakra-ui/react";
import { COLORS } from "../data/colors";
import Title from "../Custom/Title";
import IntegrationRow from "./IntegrationRow";
import UploadConfig from "./UploadConfig";
import Display from "./Display";
import { useState } from "react";

const Hero = () => {
  const [integrations] = useState([]);
  const [configFile, setConfig] = useState(null);

  return (
    <Flex spacing={4} height={"100vh"} overflow={"scroll"}>
      <VStack
        spacing={4}
        width={"100%"}
        alignItems={"center"}
        justifyItems={"stretch"}
      >
        <VStack
          p={3}
          bgColor={COLORS.table}
          borderRadius={"sm"}
          boxShadow="md"
          spacing={4}
          width={"80vw"}
          maxWidth={"1000px"}
          alignItems={"left"}
          justifyItems={"center"}
        >
          <Title
            header={"API Integrations"}
            buttonVisibility={false}
            isLoading={false}
          />

          {integrations.length === 0 ? (
            <UploadConfig
              configFile={configFile}
              setConfig={setConfig}
              description={
                "To integrate with our API, you'll need to upload a JSON configuration file. This file contains the necessary settings and parameters for the integration. Please ensure your JSON file is correctly formatted and contains all the required information."
              }
            />
          ) : (
            integrations.map((integration, index) => (
              <IntegrationRow key={index} integration={integration} />
            ))
          )}

          {configFile === null ? null : <Display configData={configFile} />}
        </VStack>
      </VStack>
    </Flex>
  );
};

export default Hero;
