import { VStack, Flex } from "@chakra-ui/react";
import { COLORS } from "../data/colors";
import Title from "../Custom/Title";
import IntegrationRow from "./IntegrationRow";
import UploadConfig from "./UploadConfig";
import Display from "./Display";
import { useState } from "react";

const Hero = () => {

    const [integrations] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const [configFile, setConfig] = useState(null);

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
                    <Title header={"API Integrations"} buttonVisibility={integrations.length !== 0} isLoading={false} onClick={() => setAddNew(integrations.length === 0 ? false : !addNew)} buttonText={addNew ? "Cancel" : "New Integration"} />
                    {
                        !addNew ? null :
                            <UploadConfig configFile={configFile} setConfig={setConfig} />
                    }

                    {
                        integrations.length === 0 ?
                            <UploadConfig configFile={configFile} setConfig={setConfig} />
                            :
                            integrations.map((integration, index) => (
                                <IntegrationRow key={index} integration={integration} />
                            ))
                    }

                    {
                        configFile === null ? null :
                            <Display configData={configFile} />
                    }

                </VStack>
            </VStack>
        </Flex>
    );
};

export default Hero;
