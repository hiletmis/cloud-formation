import { VStack, Flex, Spacer } from "@chakra-ui/react";
import { COLORS } from "../data/colors";
import Title from "../Custom/Title";
import IntegrationRow from "./IntegrationRow";
import UploadConfig from "./UploadConfig";
import { useState } from "react";
import ReactJsonViewCompare from 'react-json-view-compare';
import '../index.css'

const Hero = () => {

  const [integrations] = useState([]);
  const [configFile, setConfig] = useState(null);
  const [configFile2, setConfig2] = useState(null);

  const oldData = configFile === null ? null : JSON.parse(configFile)
  const newData = configFile2 === null ? null : JSON.parse(configFile2)

  return (
    <Flex
      spacing={4}
      height={"100vh"}
      overflow={"scroll"}
    >
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
          <Title header={"Compare API Configuration"} buttonVisibility={false} isLoading={false} />


          {
            integrations.length === 0 ?
              <Flex p={5} justifyContent={"space-around"}>
                <UploadConfig configFile={configFile} setConfig={setConfig} description={"Upload a config file to compare"} />
                <Spacer width={"10px"} />
                <UploadConfig configFile={configFile2} setConfig={setConfig2} description={"Upload a config file to compare"} />

              </Flex>
              :
              integrations.map((integration, index) => (
                <IntegrationRow key={index} integration={integration} />
              ))
          }

          {
            configFile === null ? null :
              <VStack bgColor={"red"}>
                <ReactJsonViewCompare oldData={oldData} newData={newData} />;
              </VStack>
          }

        </VStack>
      </VStack>
    </Flex>
  );
};

export default Hero;
