import React from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import Key from './Key';

const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['🔙', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '▶'],
];

export default function Keyboard({ tryAddLetterToCurrentGuessWord }) {
  return (
    <VStack>
      {
      keyboardRows.map((row, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <HStack key={i}>
          {
            row.map((letter) => (
              <Key
                key={letter}
                clicked={
                  ['🔙', '▶'].includes(letter)
                    ? () => {}
                    : () => tryAddLetterToCurrentGuessWord(letter)
                }
                char={letter}
              />
            ))
          }
        </HStack>
      ))
    }
    </VStack>
  );
}
