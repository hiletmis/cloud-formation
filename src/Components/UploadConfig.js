import { useState, useRef } from "react";
import { VStack, Flex, Text, Box, Button, Spacer } from "@chakra-ui/react";
import { COLORS } from "../data/colors";

const Hero = ({ configFile, setConfig, description }) => {
  let fileReader;

  const inputFile = useRef(null);
  const [filename, setFilename] = useState(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleFileRead = (e) => {
    const content = fileReader.result;
    setConfig(content);
  };

  const handleFileUpload = (e) => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(files[0]);

      setFilename(filename);
    }
  };

  const resetFile = () => {
    setConfig(null);
    setFilename(null);
    inputFile.current.value = null;
  };

  const handleClick = () => {
    filename == null ? onButtonClick() : resetFile();
  };

  return (
    <VStack
      width={"100%"}
      justifyContent={"center"}
      alignItems={"left"}
      direction={"column"}
    >
      <Text fontSize={"sm"}>{description}</Text>
      <Box
        p={"2"}
        border={"2px"}
        borderColor={COLORS.main}
        borderRadius={"md"}
        alignItems={"center"}
        width={"100%"}
      >
        <Flex>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            {filename}
          </Text>
          <Spacer />
          <Button
            onClick={() => {
              handleClick();
            }}
            colorScheme={"red"}
            variant={"outline"}
            size={"sm"}
          >
            {configFile == null ? "Browse" : "Remove"}
          </Button>
          <div>
            <input
              style={{ display: "none" }}
              accept=".json"
              ref={inputFile}
              onChange={handleFileUpload}
              type="file"
            />
          </div>
        </Flex>
      </Box>
    </VStack>
  );
};

export default Hero;
