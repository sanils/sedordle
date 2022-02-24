import React from 'react';
import { Center, Flex, Text } from '@chakra-ui/react';

export default function Letter({ isCurrentGuess, char, colour }) {
  return (
    <Flex
      backgroundColor={colour}
      borderWidth="1px"
      width="1.75em"
      height={isCurrentGuess ? '2.75em' : '1.75em'}
      justify="center"
    >
      <Center>
        <Text color={colour !== undefined ? 'white' : undefined}>
          {char}
        </Text>
      </Center>
    </Flex>
  );
}
