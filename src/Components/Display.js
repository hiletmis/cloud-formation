import { useEffect, useState } from "react";
import {
  VStack,
  Flex,
  Text,
  Box,
  Input,
  Spacer,
} from "@chakra-ui/react";
import Endpoint from "./Endpoint";
import InputRow from "../Custom/InputRow";
import { COLORS } from "../data/colors";
import Title from "../Custom/Title";
import ExpandableView from "../Custom/ExpandableView";
import ImageButton from "../Custom/ImageButton";
import { populateOis } from "../Helpers/DownloadConfig";
import CloudFormation from "../data/cloud-formation.json";

const Hero = ({ configData }) => {
  const [ois, setOis] = useState([]);
  const [SECURITY_SCHEME_VALUES, setSecuritySchemeValue] = useState([]);
  const [AIRNODE_WALLET_MNEMONIC, setAirnodeWalletMnemonic] = useState("");

  useEffect(() => {
    setOis([]);

    const config = configData === null ? null : JSON.parse(configData);

    if (config == null) return;
    if (config.ois === undefined) return;
    if (config.ois.length === 0) return;

    if (config.airnodeWalletMnemonic === null) return;

    setOis(config.ois);
    setAirnodeWalletMnemonic(String(config.airnodeWalletMnemonic));
    setSecuritySchemeValue(config.apiCredentials);
  }, [configData]);

  const setSecuritySchemeValues = (i, value) => {
    const newState = SECURITY_SCHEME_VALUES.map((obj, index) => {
      if (index === i) {
        return { ...obj, securitySchemeValue: value };
      }

      return obj;
    });
    setSecuritySchemeValue(newState);
  };

  return configData === null ? null : (
    <VStack p={1} spacing={4} alignItems={"left"}>
      <Title
        header={"Airnode Wallet Mnemonic"}
        isLoading={false}
        buttonVisibility={false}
      />
      <VStack
        alignItems={"left"}
        p={2}
        border={"1px"}
        borderColor={COLORS.main}
        width={"100%"}
      >
        <InputRow
          text={AIRNODE_WALLET_MNEMONIC}
          title={"Enter wallet mnemonic:"}
          setText={setAirnodeWalletMnemonic}
        />
      </VStack>
      {ois.map((ois, index) => (
        <VStack key={index} alignItems={"left"} width={"100%"}>
          <Title
            header={ois.title}
            buttonVisibility={false}
            isLoading={false}
          />
          <VStack
            bgColor={COLORS.table}
            border={"1px"}
            borderColor={COLORS.main}
            spacing={4}
            alignItems={"left"}
          >
            <ExpandableView
              status={5}
              view={
                <VStack
                  alignItems={"left"}
                  p={2}
                  border={"1px"}
                  borderColor={COLORS.main}
                  width={"100%"}
                >
                  <VStack width={"100%"} direction="row" align="left">
                    <Text fontWeight={"bold"} fontSize={"md"}>
                      {"Security Scheme Value"}
                    </Text>
                    <Box
                      p="2"
                      width={"100%"}
                      borderRadius={"10"}
                      bgColor={COLORS.table}
                      alignItems={"center"}
                    >
                      <Flex className="box">
                        <Input
                          type="text"
                          value={
                            SECURITY_SCHEME_VALUES[index].securitySchemeValue
                          }
                          onChange={(e) =>
                            setSecuritySchemeValues(index, e.target.value)
                          }
                          size="md"
                        />
                        <Spacer />
                      </Flex>
                    </Box>
                  </VStack>
                </VStack>
              }
              header={"Secrets"}
            ></ExpandableView>
            <ExpandableView
              status={5}
              view={ois.endpoints
                .filter((endpoint) => endpoint.name === "feed")
                .map((endpoint, index) => (
                  <VStack key={index} alignItems={"left"} width={"100%"}>
                    <Endpoint
                      endpoint={endpoint}
                      servers={ois.apiSpecifications.servers}
                    />
                  </VStack>
                ))}
              header={"Feeds"}
            ></ExpandableView>
          </VStack>
        </VStack>
      ))}
      <Flex justifyContent={"center"} marginBottom={"20px"}>
        <ImageButton
          onClick={() => populateOis(configData, AIRNODE_WALLET_MNEMONIC, SECURITY_SCHEME_VALUES, ois, CloudFormation)}
          bgColor={COLORS.info}
          description={"Cloud Formation"}
          icon={"./cloudFormation.svg"}
        />
        <ImageButton
          onClick={() => populateOis(configData, AIRNODE_WALLET_MNEMONIC, SECURITY_SCHEME_VALUES, ois, CloudFormation, "docker")}
          bgColor={COLORS.info}
          description={"Local Run"}
          icon={"./docker.svg"}
        />
        <ImageButton
          onClick={() => populateOis(configData, AIRNODE_WALLET_MNEMONIC, SECURITY_SCHEME_VALUES, ois, CloudFormation, "env")}
          bgColor={COLORS.info}
          description={"Secrets File"}
          icon={"./env.svg"}
        />
      </Flex>
      <VStack height={"400px"}></VStack>
    </VStack>
  );
};

export default Hero;
