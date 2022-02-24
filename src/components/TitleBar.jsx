import React from 'react';
import {
  Button, Heading, HStack, useColorMode, Icon, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Text, UnorderedList,
  ListItem, Link, VStack,
} from '@chakra-ui/react';
import {
  FaRegMoon, FaSun, FaRegQuestionCircle, FaExternalLinkAlt,
} from 'react-icons/fa';

export default function TitleBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack height="10vh">
        <Heading>Sedordle</Heading>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <Icon as={FaRegMoon} /> : <Icon as={FaSun} />}
        </Button>
        <Button onClick={onOpen}>
          <Icon as={FaRegQuestionCircle} />
        </Button>
        {window.location.hostname === 'localhost'
        && (
        <Button onClick={() => { localStorage.clear(); window.location = '/'; }}>
          Clear localStorage
        </Button>
        )}
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
                See the code for this website on
                {' '}
                <Link display="inline-flex" alignItems="center" href="https://github.com/psidex/sedordle" isExternal>
                  GitHub
                  <FaExternalLinkAlt style={{ marginLeft: '0.5em' }} />
                </Link>
              </Text>
              <Text>Check out these other great games:</Text>
              <UnorderedList>
                <ListItem>
                  <Link display="inline-flex" alignItems="center" href="https://www.nytimes.com/games/wordle/index.html" isExternal>
                    Wordle
                    <FaExternalLinkAlt style={{ marginLeft: '0.5em' }} />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link display="inline-flex" alignItems="center" href="https://zaratustra.itch.io/dordle" isExternal>
                    Dordle
                    <FaExternalLinkAlt style={{ marginLeft: '0.5em' }} />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link display="inline-flex" alignItems="center" href="https://www.quordle.com/#/" isExternal>
                    Quordle
                    <FaExternalLinkAlt style={{ marginLeft: '0.5em' }} />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link display="inline-flex" alignItems="center" href="https://octordle.com/" isExternal>
                    Octordle
                    <FaExternalLinkAlt style={{ marginLeft: '0.5em' }} />
                  </Link>
                </ListItem>
              </UnorderedList>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
