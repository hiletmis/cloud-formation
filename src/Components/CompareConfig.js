import { VStack, Flex, Spacer } from "@chakra-ui/react";
import { COLORS } from "../data/colors";
import Title from "../Custom/Title";
import IntegrationRow from "./IntegrationRow";
import UploadConfig from "./UploadConfig";
import { useState, useEffect } from "react";
import CompareEndpoints from "./CompareEndpoints";

const Hero = () => {
  const [integrations] = useState([]);
  const [configFile, setConfig] = useState(null);
  const [configFile2, setConfig2] = useState(null);
  const [oldOis, setOldOis] = useState([]);
  const [newOis, setNewOis] = useState([]);

  useEffect(() => {
    setOldOis([]);
    if (configFile === null) return;

    const oldData = configFile === null ? null : JSON.parse(configFile);

    if (oldData == null) return;
    if (oldData.ois === undefined) return;
    if (oldData.ois.length === 0) return;

    setOldOis(oldData.ois);
  }, [configFile]);

  useEffect(() => {
    setNewOis([]);
    if (configFile2 === null) return;

    const newData = configFile2 === null ? null : JSON.parse(configFile2);

    if (newData == null) return;
    if (newData.ois === undefined) return;
    if (newData.ois.length === 0) return;

    setNewOis(newData.ois);
  }, [configFile2]);

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
            header={"Compare API Configuration"}
            buttonVisibility={false}
            isLoading={false}
          />

          {integrations.length === 0 ? (
            <Flex p={5} justifyContent={"space-around"}>
              <UploadConfig
                configFile={configFile}
                setConfig={setConfig}
                description={"Upload NEW config file"}
              />
              <Spacer width={"10px"} />
              <UploadConfig
                configFile={configFile2}
                setConfig={setConfig2}
                description={"Upload an old config file"}
              />
            </Flex>
          ) : (
            integrations.map((integration, index) => (
              <IntegrationRow key={index} integration={integration} />
            ))
          )}

          <VStack alignItems={"left"}>
            <VStack alignItems={"left"} width={"100%"}>
              <CompareEndpoints oldOis={oldOis} newOis={newOis} />
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default Hero;
