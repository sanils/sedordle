import React from 'react';
import { ChakraProvider, VStack } from '@chakra-ui/react';

import TitleBar from './components/TitleBar';
import GameBoard from './components/GameBoard';

export default function App() {
  return (
    <ChakraProvider>
      <VStack>
        <TitleBar />
        <GameBoard />
      </VStack>
    </ChakraProvider>
  );
}
