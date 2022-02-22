import { VStack } from '@chakra-ui/react';
import React from 'react';
import Guess from './Guess';

function getColoursFromGuess(guess, target) {
  const guessLetters = guess.split('');
  const targetLetters = target.split('');
  const colours = ['', '', '', '', ''];

  guessLetters.forEach((guessLetter, i) => {
    if (guessLetter === targetLetters[i]) {
      colours[i] = '#538D4E';
    } else if (targetLetters.includes(guessLetter)) {
      colours[i] = '#C9B458';
    } else if (guessLetter.trim() !== '') {
      colours[i] = '#787C7E';
    }
  });

  return colours;
}

// TODO: Clean this spaghetti up

// eslint-disable-next-line no-unused-vars
export default function Wordle({ currentGuessWord, guessedWords, targetWord }) {
  const renderCurrentGuess = !guessedWords.includes(targetWord);
  const correctGuessIndex = guessedWords.indexOf(targetWord);

  return (
    <VStack className="wordle" height="15em" overflow="scroll">
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
      {renderCurrentGuess && (
      <Guess
        letters={currentGuessWord.split('')}
        colours={[]}
      />
      )}
      {[...Array((21 - guessedWords.length) - (renderCurrentGuess ? 1 : 0)).keys()].map((_, i) => (
        <Guess
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          letters={[]}
          colours={[]}
        />
      ))}
    </VStack>
  );
}
