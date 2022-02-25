import React from 'react';
import { Flex, Text, useColorMode } from '@chakra-ui/react';

function getKeyColour(colorMode, used) {
  if (used) {
    return colorMode === 'light' ? '#787C7E' : '#3A3A3C';
  }
  return colorMode === 'light' ? '#D3D6DA' : '#818384';
}

export default function Key({ clicked, used, char }) {
  const { colorMode } = useColorMode();
  return (
    <Flex
      _hover={{ cursor: 'pointer' }}
      backgroundColor={getKeyColour(colorMode, used)}
      onClick={clicked}
      width="8vw"
      height="8vw"
      maxWidth="3em"
      maxHeight="3em"
      alignItems="center"
      textAlign="center"
    >
      <Text width="100%">
        {char}
      </Text>
    </Flex>
  );
}
