import React from 'react';
import { HStack, Icon, VStack } from '@chakra-ui/react';
import { BsBackspace } from 'react-icons/bs';
import { AiOutlineEnter } from 'react-icons/ai';

import Key from './Key';

/* eslint-disable no-nested-ternary */

const enterIcon = <Icon as={AiOutlineEnter} />;
const backSpaceIcon = <Icon as={BsBackspace} />;

const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  [enterIcon, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', backSpaceIcon],
];

export default function Keyboard(props) {
  const {
    usedLetters,
    tryAddLetterToCurrentGuessWord,
    trySubmitCurrentGuessWord,
    tryBackspaceCurrentGuessWord,
  } = props;

  return (
    <VStack margin="1em 0">
      { keyboardRows.map((row, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <HStack key={i}>
          { row.map((letter, j) => (
            <Key
              // eslint-disable-next-line react/no-array-index-key
              key={`${i}-${j}`}
              onClick={
                  letter === enterIcon
                    ? trySubmitCurrentGuessWord : letter === backSpaceIcon
                      ? tryBackspaceCurrentGuessWord : () => tryAddLetterToCurrentGuessWord(letter)
                }
              char={letter}
              used={usedLetters.includes(letter)}
            />
          )) }
        </HStack>
      )) }
    </VStack>
  );
}
