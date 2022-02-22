import {
  Center, Flex, Text,
} from '@chakra-ui/react';
import React from 'react';

export default function Letter({ char, colour }) {
  return (
    <Flex
      backgroundColor={colour}
      borderWidth="1px"
      width="1.75em"
      height="2.75em"
      justify="center"
    >
      <Center>
        <Text color={colour === undefined ? 'black' : 'white'}>
          {char}
        </Text>
      </Center>
    </Flex>
  );
}
