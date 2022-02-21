import React from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import Key from './Key';

const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['👈', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '👉'],
];

export default function Keyboard() {
  return (
    <VStack>
      {
      keyboardRows.map((row, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <HStack key={i}>
          {
            row.map((letter) => (
              <Key key={letter} char={letter} />
            ))
          }
        </HStack>
      ))
    }
    </VStack>
  );
}
