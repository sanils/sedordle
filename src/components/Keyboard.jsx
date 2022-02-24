/* eslint-disable no-nested-ternary */
import React from 'react';
import { HStack, Icon, VStack } from '@chakra-ui/react';
import { BsBackspace } from 'react-icons/bs';
import { AiOutlineEnter } from 'react-icons/ai';

import Key from './Key';

const enterIcon = <Icon as={AiOutlineEnter} />;
const backSpaceIcon = <Icon as={BsBackspace} />;

const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  [enterIcon, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', backSpaceIcon],
];

export default function Keyboard({ tryAddLetterToCurrentGuessWord }) {
  const enterClicked = () => {};
  const backSpaceClicked = () => {};

  return (
    <VStack margin="1em 0">
      {
      keyboardRows.map((row, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <HStack key={i}>
          {
            row.map((letter, j) => (
              <Key
                // eslint-disable-next-line react/no-array-index-key
                key={`${i}-${j}`}
                clicked={
                  letter === enterIcon
                    ? enterClicked : letter === backSpaceIcon
                      ? backSpaceClicked : () => tryAddLetterToCurrentGuessWord(letter)
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
