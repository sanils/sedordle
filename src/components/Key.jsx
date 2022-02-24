import React from 'react';
import { Flex, Text, useColorMode } from '@chakra-ui/react';

// TODO: Make all widths the same

export default function Key({ clicked, char }) {
  const { colorMode } = useColorMode();
  return (
    <Flex
      _hover={{ cursor: 'pointer' }}
      background={colorMode === 'light' ? '#D3D6DA' : '#818384'}
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
