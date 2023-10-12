import { useEffect, useState } from "react";
import { VStack, Heading, Flex, Button, Text, Box, Input, Spacer } from "@chakra-ui/react";
import Endpoint from "./Endpoint";
import InputRow from "../Custom/InputRow";
import { COLORS } from "../data/colors";
import Title from "../Custom/Title";
import CloudFormation from "../data/cloud-formation";

const Hero = ({ configData }) => {

  const [ois, setOis] = useState([])
  const [SECURITY_SCHEME_VALUES, setSecuritySchemeValue] = useState([])
  const [AIRNODE_WALLET_MNEMONIC, setAirnodeWalletMnemonic] = useState("")

  useEffect(() => {
    setOis([])

    const config = configData === null ? null : JSON.parse(configData)

    if (config == null) return
    if (config.ois === undefined) return
    if (config.ois.length === 0) return

    if (config.airnodeWalletMnemonic === null) return

    setOis(config.ois)
    setAirnodeWalletMnemonic(String(config.airnodeWalletMnemonic))
    setSecuritySchemeValue((config.apiCredentials))
  }, [configData])

  const setSecuritySchemeValues = (i, value) => {

    const newState = SECURITY_SCHEME_VALUES.map((obj, index) => {
      if (index === i) {
        return { ...obj, securitySchemeValue: value };
      }

      return obj;
    });
    setSecuritySchemeValue(newState)
  }

  const populateOis = () => {
    const config = configData === null ? null : JSON.parse(configData)
    if (config == null) return
    if (config.ois === null) return
    if (config.ois.length === 0) return

    if (config.airnodeWalletMnemonic === null) return

    config.airnodeWalletMnemonic = AIRNODE_WALLET_MNEMONIC
    config.apiCredentials = SECURITY_SCHEME_VALUES

    const containerDefinitions = JSON.stringify(config)

    CloudFormation.Resources.MyAppDefinition.Properties.ContainerDefinitions[0].Environment[0].Value = containerDefinitions

    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(CloudFormation, null, 2)
    )}`;

    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "CloudFormation.json";

    link.click();

  }

  return (
    configData === null ? null :
      <VStack p={1} spacing={4} alignItems={"left"}>
        {
          ois.map((ois, index) => (
            <VStack key={index} alignItems={"left"} width={"100%"}>

              <Title header={ois.title} buttonVisibility={false} isLoading={false} />
              <VStack bgColor={COLORS.table} border={"1px"} borderColor={COLORS.main} p={4} spacing={4} alignItems={"left"}>

                <Flex>
                  <Heading size={"md"}>Feeds</Heading>
                </Flex>
                {
                  ois.endpoints.filter((endpoint) => endpoint.name === "feed").map((endpoint, index) => (
                    <VStack key={index} alignItems={"left"} width={"100%"}>
                      <Endpoint endpoint={endpoint} servers={ois.apiSpecifications.servers} />
                    </VStack>
                  ))
                }
              </VStack>

              <Flex>
                <Heading size={"md"}>Secrets</Heading>
              </Flex>
              <VStack alignItems={"left"} p={2} border={"1px"} borderColor={COLORS.main} width={"100%"}>

                <VStack width={"100%"} direction="row" align="left">
                  <Text fontWeight={"bold"} fontSize={"md"}>{"Security Scheme Value"}</Text>
                  <Box p="2" width={"100%"} borderRadius={"10"} bgColor={COLORS.table} alignItems={"center"}>
                    <Flex className='box'>
                      <Input type="text"
                        value={SECURITY_SCHEME_VALUES[index].securitySchemeValue}
                        onChange={(e) => setSecuritySchemeValues(index, e.target.value)}
                        size='md' />
                      <Spacer />
                    </Flex>
                  </Box>
                </VStack>
              </VStack>
              <Title header={"Airnode Wallet Mnemonic"} isLoading={false} buttonVisibility={false} />
              <VStack alignItems={"left"} p={2} border={"1px"} borderColor={COLORS.main} width={"100%"}>
                <InputRow text={AIRNODE_WALLET_MNEMONIC} title={"Enter wallet mnemonic:"} setText={setAirnodeWalletMnemonic} />
              </VStack>
            </VStack>
          ))
        }
        <VStack>
          <Button width={"250px"} height={"50px"} colorScheme="orange" size="md" onClick={populateOis}>Generate Cloud Formation</Button>
        </VStack>
        <VStack height={"400px"}></VStack>
      </VStack>
  );
};

export default Hero;