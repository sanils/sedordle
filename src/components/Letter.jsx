import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export default function Letter({ char, colour }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" width="1.75em" height="2.75em" backgroundColor={colour}>
      <Text fontSize="1.5rem" textAlign="center">
        {char}
      </Text>
    </Box>
  );
}
