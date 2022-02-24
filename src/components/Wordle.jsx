import React, { useCallback, useRef } from 'react';
import { VStack } from '@chakra-ui/react';

import Guess from './Guess';

// TODO: Clean this spaghetti up

function getColoursFromGuess(guess, target) {
  const guessLetters = guess.split('');
  const targetLetters = target.split('');
  const colours = ['', '', '', '', ''];

  guessLetters.forEach((guessLetter, i) => {
    if (guessLetter === targetLetters[i]) {
      colours[i] = '#538D4E'; // Green
    } else if (targetLetters.includes(guessLetter)) {
      colours[i] = '#C9B458'; // Yellow
    } else if (guessLetter.trim() !== '') {
      colours[i] = '#787C7E'; // Grey
    }
  });

  return colours;
}

export default function Wordle({ currentGuessWord, guessedWords, targetWord }) {
  const wordleRef = useRef(null);

  const renderCurrentGuess = !guessedWords.includes(targetWord) && guessedWords.length < 21;
  const correctGuessIndex = guessedWords.indexOf(targetWord);

  // TODO: If we look at a completed game this wont scroll to the bottom of the wordle
  const currentGuessRef = useCallback((node) => {
    if (renderCurrentGuess && node !== null) {
      const rect = node.getBoundingClientRect();
      // This function only happens after a render so I think using parentNode is
      // eslint-disable-next-line no-param-reassign
      node.parentNode.scrollTop = (node.offsetTop - node.parentNode.offsetTop)
        - node.parentNode.getBoundingClientRect().height
        + rect.height;
      // +- explained:
      // scroll guess to top of div
      // scroll down the height of the wordle box
      // scroll up the height of the guess box
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGuessWord]);

  let currentGuess;
  if (renderCurrentGuess) {
    currentGuess = (
      <Guess
        refProp={currentGuessRef}
        letters={currentGuessWord.split('')}
        colours={[]}
      />
    );
  }

  return (
    <VStack
      height="15em"
      ref={wordleRef}
      className="wordle"
      overflowY="scroll"
      scrollBehavior="smooth"
      sx={{ scrollbarWidth: 'thin' }}
    >
      {guessedWords.map((g, i) => {
        if (correctGuessIndex !== -1 && i > correctGuessIndex) {
          return (
            <Guess
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              letters={[]}
              colours={[]}
            />
          );
        }
        const colours = getColoursFromGuess(g, targetWord);
        return (
          <Guess
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            letters={g.split('')}
            colours={colours}
          />
        );
      })}
      {/* Only display current guess if we haven't guessed correctly */}
      {renderCurrentGuess && currentGuess}
      { guessedWords.length < 21 && (
        [...Array((21 - guessedWords.length) - (renderCurrentGuess ? 1 : 0)).keys()].map((_, i) => (
          <Guess
          // eslint-disable-next-line react/no-array-index-key
            key={i}
            letters={[]}
            colours={[]}
          />
        ))
      )}
    </VStack>
  );
}
