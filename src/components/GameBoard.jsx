import React, { useEffect, useState } from 'react';
import { Flex, HStack, VStack } from '@chakra-ui/react';

import useEventListener from '../hooks/useEventListener';
import useWindowSize from '../hooks/useWindowSize';
import useLocalStorage from '../hooks/useLocalStorage';

import Keyboard from './Keyboard';
import Wordle from './Wordle';

export default function GameBoard() {
  const [currentGuessWord, setCurrentGuessWord] = useLocalStorage('currentGuessWord', '');
  const [targetWords, setTargetWords] = useState([]);
  const [guessedWords, setGuessedWords] = useLocalStorage('targetWords', []);

  let slices;
  const size = useWindowSize();

  if (size.width < 800) {
    slices = [[0, 2], [2, 4], [4, 6], [6, 8], [8, 10], [10, 12], [12, 14], [14, 16]];
  } else if (size.width < 1550) {
    slices = [[0, 4], [4, 8], [8, 12], [12, 16]];
  } else {
    slices = [[0, 8], [8, 16]];
  }

  const tryAddLetterToCurrentGuessWord = (letter) => {
    if (currentGuessWord.length < 5) {
      setCurrentGuessWord(currentGuessWord + letter.toUpperCase());
    }
  };

  const typeHandler = ({ key, keyCode }) => {
    if (keyCode === 8) {
      if (currentGuessWord.length > 0) {
        setCurrentGuessWord(currentGuessWord.slice(0, -1));
      }
    } else if (keyCode === 13 && currentGuessWord.length === 5) {
      setGuessedWords([...guessedWords, currentGuessWord]);
      setCurrentGuessWord('');
    } else if (keyCode >= 65 && keyCode <= 90) {
      tryAddLetterToCurrentGuessWord(key);
    }
  };

  useEventListener('keydown', typeHandler);

  useEffect(() => {
    setTargetWords(['OTHER', 'BEERS', 'PRINT', 'TREAT', 'CABAL', 'UNITE', 'THREW', 'COLOR', 'REGAL', 'CLICK', 'MILKY', 'FEVER', 'CABLE', 'STRAY', 'STUFF', 'FIVES']);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hStacks = [];
  for (const slice of slices) {
    hStacks.push(
      <HStack spacing={3} key={slice}>
        {targetWords.slice(slice[0], slice[1]).map((targetWord, i) => (
          <Wordle
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            currentGuessWord={currentGuessWord}
            guessedWords={guessedWords}
            targetWord={targetWord}
          />
        ))}
      </HStack>,
    );
  }

  return (
    <Flex
      height="90vh"
      flexDirection="column"
      justifyContent="space-between"
    >
      <VStack spacing={8}>
        {hStacks}
      </VStack>
      <Keyboard tryAddLetterToCurrentGuessWord={tryAddLetterToCurrentGuessWord} />
    </Flex>
  );
}
