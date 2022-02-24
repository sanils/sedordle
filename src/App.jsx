import React from 'react';
import { ChakraProvider, VStack } from '@chakra-ui/react';

import theme from './theme';
import TitleBar from './components/TitleBar';
import GameBoard from './components/GameBoard';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <VStack spacing="0">
        <TitleBar />
        <GameBoard />
      </VStack>
    </ChakraProvider>
  );
}
