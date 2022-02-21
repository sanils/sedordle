import { VStack } from '@chakra-ui/react';
import React from 'react';
import Guess from './Guess';

function getColoursFromGuess(guess, target) {
  const guessLetters = guess.split('');
  const targetLetters = target.split('');
  const colours = ['', '', '', '', ''];

  guessLetters.forEach((guessLetter, i) => {
    if (guessLetter === targetLetters[i]) {
      colours[i] = 'green';
    } else if (targetLetters.includes(guessLetter)) {
      colours[i] = 'yellow';
    } else if (guessLetter.trim() !== '') {
      colours[i] = 'grey';
    }
  });

  return colours;
}

// eslint-disable-next-line no-unused-vars
export default function Wordle({ currentGuessWord, guessedWords, targetWord }) {
  return (
    <VStack className="wordle">
      {guessedWords.map((g, i) => {
        // TODO: Display up to and including correct guess, then no more
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
      {!guessedWords.includes(targetWord) && (
      <Guess
        letters={currentGuessWord.split('')}
        colours={[]}
      />
      )}
    </VStack>
  );
}
