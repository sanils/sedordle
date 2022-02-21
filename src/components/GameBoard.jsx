import { HStack, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Keyboard from './Keyboard';
import Wordle from './Wordle';

export default function GameBoard() {
  const [currentGuessWord, setCurrentGuessWord] = useState('');
  const [targetWords, setTargetWords] = useState([]);
  const [guessedWords, setGuessedWords] = useState([]);

  useEffect(() => {
    setCurrentGuessWord('print');
    setTargetWords(['other', 'beers', 'print', 'treat', 'cabal', 'unite', 'threw', 'color', 'regal', 'click', 'milky', 'fever', 'cable', 'stray', 'stuff', 'fives']);
    setGuessedWords(['ghoul', 'minty', 'bears', 'throe', 'other']);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack>
      <VStack>
        <HStack>
          {targetWords.slice(0, 8).map((targetWord, i) => (
            <Wordle
            // eslint-disable-next-line react/no-array-index-key
              key={i}
              currentGuessWord={currentGuessWord}
              guessedWords={guessedWords}
              targetWord={targetWord}
            />
          ))}
        </HStack>
        <HStack>
          {targetWords.slice(8, 16).map((targetWord, i) => (
            <Wordle
            // eslint-disable-next-line react/no-array-index-key
              key={i}
              currentGuessWord={currentGuessWord}
              guessedWords={guessedWords}
              targetWord={targetWord}
            />
          ))}
        </HStack>
      </VStack>
      <Keyboard />
    </VStack>
  );
}
