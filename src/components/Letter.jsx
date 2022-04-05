import React from 'react';
import { Center, Flex, Text } from '@chakra-ui/react';

export default function Letter({ char, colour }) {
  return (
    <Flex
      backgroundColor={colour}
      borderWidth="1px"
      width="2em"
      height="2em"
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
