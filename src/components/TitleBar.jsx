import React from 'react';
import {
  Button, Heading, HStack, useColorMode, Icon, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Text, UnorderedList,
  ListItem, Link, VStack,
} from '@chakra-ui/react';
import {
  FaRegMoon, FaSun, FaRegQuestionCircle, FaExternalLinkAlt,
} from 'react-icons/fa';

function NiceLink({ text, url }) {
  return (
    <Link display="inline-flex" alignItems="center" href={url} isExternal>
      {text}
      <FaExternalLinkAlt style={{ marginLeft: '0.5em' }} />
    </Link>
  );
}

// eslint-disable-next-line no-unused-vars
export default function TitleBar({ gameMode, setGameMode, correctGuessCount }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack height="5em" position="fixed" top="0">
      <Heading>Wordle</Heading>
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? <Icon as={FaRegMoon} /> : <Icon as={FaSun} />}
      </Button>
      <Text>
        {correctGuessCount}
        /2
      </Text>
    </HStack>
  );
}
