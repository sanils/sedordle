import React from 'react';
import { HStack } from '@chakra-ui/react';

import Letter from './Letter';

export default function Guess({ letters, colours, refProp }) {
  // make effect and state?
  const isGuess = letters.length === 5 && colours.join('').split('').length > 0;

  return (
    <HStack ref={refProp}>
      {letters.concat(Array(5 - letters.length).fill('')).map((l, i) => (
        <Letter
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          char={l}
          colour={colours[i]}
          isGuess={isGuess}
        />
      ))}
    </HStack>
  );
}
