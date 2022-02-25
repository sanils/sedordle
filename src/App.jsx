import React, { useState } from 'react';
import { ChakraProvider, VStack } from '@chakra-ui/react';

import theme from './theme';
import TitleBar from './components/TitleBar';
import GameBoard from './components/GameBoard';

export default function App() {
  const [gameMode, setGameMode] = useState('');
  const [correctGuessCount, setCorrectGuessCount] = useState(0);
  return (
    <ChakraProvider theme={theme}>
      <VStack spacing="0">
        <TitleBar
          gameMode={gameMode}
          setGameMode={setGameMode}
          correctGuessCount={correctGuessCount}
        />
        <GameBoard
          gameMode={gameMode}
          correctGuessCount={correctGuessCount}
          setCorrectGuessCount={setCorrectGuessCount}
        />
      </VStack>
    </ChakraProvider>
  );
}
