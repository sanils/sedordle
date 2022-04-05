import React, {
  useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import {
  HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  Text, VStack, Flex, useDisclosure, useToast, Button, Box,
} from '@chakra-ui/react';

import useEventListener from '../hooks/useEventListener';
import useWindowSize from '../hooks/useWindowSize';
import useLocalStorageOriginal from '../hooks/useLocalStorage';

import Keyboard from './Keyboard';
import Wordle from './Wordle';

import VALID_GUESSES from '../wordle/validguesses';
import { TARGET_WORDS, getTargetWords } from '../wordle/targetwords';

// TODO: Practice mode?
// TODO: Lots of state going on here, maybe clean it up a bit, more components?

export default function GameBoard({ gameMode, correctGuessCount, setCorrectGuessCount }) {
  let useLocalStorage = useLocalStorageOriginal;
  if (gameMode === 'practice') {
    useLocalStorage = (_, arg) => useState(arg);
  }

  const [currentGuessWord, setCurrentGuessWord] = useLocalStorage('currentGuessWord', '');
  const [targetWords, setTargetWords] = useState([]);
  const [guessedWords, setGuessedWords] = useLocalStorage('guessedWords', []);
  const [currentDate, setCurrentDate] = useLocalStorage('currentDate', '');
  const [usedLetters, setUsedLetters] = useLocalStorage('usedLetters', []);
  const [hasWonGame, setHasWonGame] = useState(false);
  const [hasFinishedGame, setHasFinishedGame] = useState(false);
  const [individualScores, setIndividualScores] = useState({});

  const toast = useToast();
  const size = useWindowSize();

  // For calculating height css
  const lowerBoxRef = useRef();
  const [lowerBoxDimensions, setLowerBoxDimensions] = useState({ width: 0, height: 0 });

  // Success modal controls
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO: Put in effect & state?
  const slices = [[0, 2]];
  // if (size.width < 800) {
  //   slices = new Array(2).fill(undefined).map((_, i) => [i, i + 1]);
  // } else if (size.width < 1000) {
  //   slices = [[0, 2]];
  // } else if (size.width < 1550) {
  //   slices = [[0, 2]];
  // }

  useLayoutEffect(() => {
    // https://stackoverflow.com/a/57272554/6396652
    if (lowerBoxRef.current) {
      setLowerBoxDimensions({
        width: lowerBoxRef.current.offsetWidth,
        height: lowerBoxRef.current.offsetHeight,
      });
    }
  }, []);

  const handleWordleStateChange = (id, correctCount) => {
    // I don't fully understand why, but using a function here fixes it not working when
    // we load a page with completed wordles and they all run this as quick as possible
    // Something to do with lots of setStates in one go need reference to the current state
    // See https://stackoverflow.com/a/48209870/6396652
    // eslint-disable-next-line no-shadow
    setIndividualScores((individualScores) => ({ ...individualScores, [id]: correctCount }));
  };

  const tryAddLetterToCurrentGuessWord = (letter) => {
    if (currentGuessWord.length < 5) {
      setCurrentGuessWord(currentGuessWord + letter.toUpperCase());
    }
  };

  const tryBackspaceCurrentGuessWord = () => {
    if (currentGuessWord.length > 0) {
      setCurrentGuessWord(currentGuessWord.slice(0, -1));
    }
  };

  const trySubmitCurrentGuessWord = () => {
    if (
      currentGuessWord.length === 5
      && (TARGET_WORDS.includes(currentGuessWord) || VALID_GUESSES.includes(currentGuessWord))
    ) {
      // TODO: This will create duplicates
      setUsedLetters([...usedLetters, ...currentGuessWord.split('')]);
      setGuessedWords([...guessedWords, currentGuessWord]);
      setCurrentGuessWord('');
    } else {
      toast({
        title: 'Invalid Guess',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEventListener('keydown', ({ key, keyCode }) => {
    // TODO: Double tapping enter submits the word twice (I think)
    // TODO: Pressing 2 letters quickly sometimes doesn't work
    if (keyCode === 8) {
      tryBackspaceCurrentGuessWord();
    } else if (keyCode === 13) {
      trySubmitCurrentGuessWord();
    } else if (keyCode >= 65 && keyCode <= 90) {
      tryAddLetterToCurrentGuessWord(key);
    }
  });

  // On first render calculate target words and erase any old game data
  useEffect(() => {
    // I'm pretty sure this will give everyone the same words each day
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, '');

    const selected = getTargetWords(date);
    setTargetWords(selected);

    if (currentDate !== date) {
      setCurrentDate(date);
      setGuessedWords([]);
      setCurrentGuessWord('');
      setUsedLetters([]);
      setHasWonGame(false);
      setHasFinishedGame(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When new guesses come in, check if the game is over
  useEffect(() => {
    if (targetWords.length === 0) {
      // If we are inside this block, we are loading from the default state, which
      // could mean that we have 10 guesses from localStorage but 0 target words, which
      // is going to trigger the end of the game unless we stop here
      return;
    }

    let correct = 0;
    for (const word of targetWords) {
      if (guessedWords.includes(word)) {
        correct += 1;
      }
    }
    setCorrectGuessCount(correct);
    setHasWonGame(correct === 2);
    setHasFinishedGame(correct === 2 || guessedWords.length === 10);
  }, [guessedWords, targetWords, setCorrectGuessCount]);

  useEffect(() => {
    if (hasFinishedGame) {
      onOpen();
    }
  }, [hasFinishedGame, onOpen]);

  const hStacks = [];
  for (const slice of slices) {
    // Must have a set height for the children to match
    hStacks.push(
      <HStack minHeight="15em" height="0" flexGrow={1} alignItems="stretch" spacing={3} key={slice}>
        {targetWords.slice(slice[0], slice[1]).map((targetWord, i) => (
          <Wordle
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            index={slice[0] + i}
            currentGuessWord={currentGuessWord}
            guessedWords={guessedWords}
            targetWord={targetWord}
            handleWordleStateChange={handleWordleStateChange}
          />
        ))}
      </HStack>,
    );
  }

  return (
    <>
      <Flex
        width="100vw"
        height={`calc(100% - 5em - ${lowerBoxDimensions.height}px)`}
        overflowY="auto"
        position="fixed"
        top="5em"
        flexDirection="column"
        alignItems="center"
      >
        <VStack spacing={4} flexGrow={1} flexDirection="column">
          {hStacks}
        </VStack>
      </Flex>

      <Box ref={lowerBoxRef} position="fixed" bottom="0">
        {/* DEBUG CONTROLS */}
        {window.location.hostname === 'localhost'
        && (
          <HStack sx={{ marginTop: '1em' }} padding="1em" backgroundColor="purple">
            <Button
              onClick={() => {
                setGuessedWords([...targetWords.slice(0, 15), 'TESTS', 'TESTS', 'TESTS', 'TESTS', 'TESTS']);
              }}
            >
              Fill 15/16 20/21
            </Button>
            <Button onClick={() => { localStorage.clear(); window.location.reload(); }}>
              Clear localStorage
            </Button>
          </HStack>
        )}

        <Keyboard
          usedLetters={usedLetters}
          tryAddLetterToCurrentGuessWord={tryAddLetterToCurrentGuessWord}
          trySubmitCurrentGuessWord={trySubmitCurrentGuessWord}
          tryBackspaceCurrentGuessWord={tryBackspaceCurrentGuessWord}
        />
      </Box>

      {/* TODO: Make this a bit better. Statistics? */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <VStack sx={{ marginBottom: '2em' }}>
              {hasWonGame ? (
                <Text>Congratulations!!</Text>
              ) : (
                <Text>Bad luck!</Text>
              )}
              <Text>
                You are going to be grandparents!!
              </Text>
              {hasWonGame === false && (
                <Text textAlign="center">
                  The answers were:
                  {' '}
                  {targetWords.join(', ')}
                </Text>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
