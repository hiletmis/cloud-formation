import { useEffect, useState } from "react";
import {
  VStack,
  Flex,
  Text,
  Box,
  Input,
  Spacer, Image
} from "@chakra-ui/react";
import Endpoint from "./Endpoint";
import InputRow from "../Custom/InputRow";
import { COLORS } from "../data/colors";
import Title from "../Custom/Title";
import ExpandableView from "../Custom/ExpandableView";
import ImageButton from "../Custom/ImageButton";
import { populateOis } from "../Helpers/DownloadConfig";
import CloudFormation from "../data/cloud-formation.json";
import Help from "./Help";

const Hero = ({ configData }) => {
  const [ois, setOis] = useState([]);
  const [SECURITY_SCHEME_VALUES, setSecuritySchemeValue] = useState([]);
  const [AIRNODE_WALLET_MNEMONIC, setAirnodeWalletMnemonic] = useState("");
  const [remarks, setRemarks] = useState(null);
  const [showHelp, setShowHelp] = useState(null);

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

  const isSuccessful = (res) => {

    if (res.status === false) {
      setRemarks({ message: res.message, color: COLORS.error, image: "./error.svg" });
    }

    if (res.status === true) {
      setRemarks({ message: res.message, color: COLORS.success, image: "./success.svg" });
      setShowHelp(res.mode);
    }

    setTimeout(() => {
      setRemarks(null);
    }, 5000);
  };

  const selectDownloadMode = (mode) => {
    setRemarks(null);
    setShowHelp(null);
    populateOis(configData, AIRNODE_WALLET_MNEMONIC, SECURITY_SCHEME_VALUES, ois, CloudFormation, mode, isSuccessful)
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
      {
        remarks === null ? null :
          <VStack p={2} bgColor={remarks.color} borderRadius={"md"} alignItems={"left"} width={"100%"}>
            <Flex>
              <Image src={remarks.image} alt={"error"} width={"30px"} height={"20px"} />
              <Text fontWeight={"bold"} fontSize={"md"}>{remarks.message}</Text>

            </Flex>
          </VStack>
      }
      <Flex>
        <VStack bgColor={"green.300"} p={3} width={"120px"} spacing={"10"} justifyContent={"center"}>
          <ImageButton
            inW={"50px"} outW={"100px"}
            onClick={() => selectDownloadMode("cloud")}
            description={null}
            src={"./cloudFormation.svg"}
          />
          <ImageButton
            inW={"50px"} outW={"100px"}
            onClick={() => selectDownloadMode("docker")}
            description={null}
            src={"./docker.svg"}
          />

        </VStack>
        <Help mode={showHelp} />
      </Flex>

    </VStack>
  );
};

export default Hero;
