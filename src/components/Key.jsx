import React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';

export default function Key({ clicked, char }) {
  const { colorMode } = useColorMode();
  return (
    <Box
      _hover={{ cursor: 'pointer' }}
      background={colorMode === 'light' ? '#D3D6DA' : '#818384'}
      padding="1em"
      onClick={clicked}
    >
      <p>{char}</p>
    </Box>
  );
}
