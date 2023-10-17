import { VStack, Image, Text } from "@chakra-ui/react";
import { Flex, Box } from "@chakra-ui/react";
import Steps from "../Custom/Steps";

const Hero = (mode) => {

    const getIcon = () => {
        switch (mode.mode) {
            case "docker":
                return "./docker.svg";
            case "env":
                return "./env.svg";
            case "cloud":
                return "./cloudFormation.svg";
            default:
                return "./info.svg";
        }
    }

    const getTtile = () => {
        switch (mode.mode) {
            case "docker":
                return "Run as a docker container";
            case "env":
                return "Environment File";
            case "cloud":
                return "Upload to AWS Cloud Formation";
            default:
                return "Deployment options";
        }
    }

    const getDescrption = () => {
        switch (mode.mode) {
            case "docker":
                return [
                    "Install docker engine on your machine",
                    "Open a terminal and run the following command",
                    "bash docker-pusher.sh",
                    "Wait for the docker image to be downloaded and the container to be started",
                    "Check the logs for any errors",
                    "After a successful deployment, you should see your signed data in https://pool.nodary.io/<YOUR_AIRNODE_ADDRESS>"];
            case "env":
                return [
                    "Download the secrets file",
                    "Clone the Pusher repository",
                    "Copy the secrets file to the /config folder",
                    "Download the Pusher config file",
                    "Copy the Pusher config file to the /config folder",
                    "Run the Pusher locally with the following command",
                    "node --enable-source-maps dist/index.js"
                ];
            case "cloud":
                return [
                    "Go to CloudFormation section in the AWS dashboard, click on Create Stack, upload your template in Step 1",
                    "Give a name to your stack in Step 2",
                    "Don't change anything in Step 3",
                    "Tick the checkbox with the text I acknowledge that AWS CloudFormation might create IAM resources in Step 4 and submit.",
                    "Wait for AWS to deploy everything and check CloudWatch log group named myAppLogs to see what's up. After 1 or 2 minutes, you should see your signed data in https://pool.nodary.io/<YOUR_AIRNODE_ADDRESS> after a successful deployment."
                ];
            default:
                return ["Fill in the form and select a deployment method", "Wallet mnemonic is mandatory", "Enter at least one OIS", "Enter at least one API key"];
        }
    }


    return (
        <VStack spacing={1} bgColor={"green.100"} w={"100%"} direction="row" align="left">

            <Flex alignItems={"center"} direction={"row"} p={3}>
                <Image borderRadius={"lg"} src={getIcon()} alt={"error"} width={"40px"} height={"40px"} />
                <Box p={2}>
                    <Text fontWeight={"bold"} fontSize={"lg"}>{getTtile()}</Text>
                </Box>
            </Flex>
            <Steps steps={getDescrption()} />
            <Flex
                p={3}
                width={"100%"}
                align={"center"}
            >
                <Image src="./info.svg" width={"24px"} />
                <Text ml={2} fontWeight={"bold"} fontSize={"md"}>
                    For more information check out docs <a href={"https://docs.api3.org/"} target={"_blank"} rel="noreferrer">here</a>
                </Text>
            </Flex>
        </VStack>
    );
};

export default Hero;
