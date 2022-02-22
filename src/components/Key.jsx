import React from 'react';
import { Box } from '@chakra-ui/react';

export default function Key({ clicked, char }) {
  return (
    <Box onClick={clicked}>
      <p>{char}</p>
    </Box>
  );
}
