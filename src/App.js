import "./App.css";
import Header from "./Components/Header";
import Welcome from "./Components/Welcome";
import CompareConfig from "./Components/CompareConfig";
import Integrations from "./Components/Integrations";

import { HashRouter, Routes, Route } from "react-router-dom";

import { ColorModeScript } from "@chakra-ui/react";

import { ChakraProvider, Flex, VStack } from "@chakra-ui/react";
import theme from "./theme";

import ParticlesBg from "./Custom/ParticlesBg";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <HashRouter>
        <Header />
        <Flex
          h="calc(100vh - 60px)"
          bgColor={"transparent"}
          spacing={0}
          p={2}
          boxShadow="lg"
          alignItems={"stretch"}
          flexDirection={"row"}
        >
          <VStack overflow={"scroll"} width={"100%"} alignItems={"left"}>
            <ParticlesBg />

            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/upload" element={<Integrations />} />
              <Route path="/compare" element={<CompareConfig />} />
            </Routes>
          </VStack>
        </Flex>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
