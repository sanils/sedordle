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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack height="5em" position="fixed" top="0">
        <Heading>Sedordle</Heading>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <Icon as={FaRegMoon} /> : <Icon as={FaSun} />}
        </Button>
        <Button onClick={onOpen}>
          <Icon as={FaRegQuestionCircle} />
        </Button>
        <Text>
          {correctGuessCount}
          /16
        </Text>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sedordle</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Text>You know how to play.</Text>
              <Text>
                Sedordle resets at midnight
                {' '}
                <NiceLink text="UTC" url="https://time.is/UTC" />
              </Text>
              <Text>
                See the code for this website on
                {' '}
                <NiceLink text="GitHub" url="https://github.com/psidex/sedordle" />
              </Text>
              <Text>Check out these other great games:</Text>
              <UnorderedList>
                <ListItem>
                  <NiceLink text="Wordle" url="https://www.nytimes.com/games/wordle/index.html" />
                </ListItem>
                <ListItem>
                  <NiceLink text="Dordle" url="https://zaratustra.itch.io/dordle" />
                </ListItem>
                <ListItem>
                  <NiceLink text="Quordle" url="https://www.quordle.com/#/" />
                </ListItem>
                <ListItem>
                  <NiceLink text="Octordle" url="https://octordle.com/" />
                </ListItem>
              </UnorderedList>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
