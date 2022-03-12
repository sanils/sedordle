import React, { useEffect, useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { BsShareFill } from 'react-icons/bs';

const pad = (i) => i.toLocaleString(undefined, { minimumIntegerDigits: 2, useGrouping: false });

const scoreTextSlices = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
];

export default function ShareButton({ correctGuessCount, individualScores }) {
  const toast = useToast();
  const [resultText, setResultText] = useState('');

  useEffect(() => {
    let text = `Sedordle ${new Date().toJSON().slice(0, 10)}`;

    text += `\n\n${correctGuessCount}/16\n`;

    for (const slice of scoreTextSlices) {
      let line = '\n';

      for (const i of slice) {
        const score = individualScores[i];
        const scoreText = score === -1 ? '❌' : pad(score + 1);
        line += `${scoreText}`;

        if (i !== slice[slice.length - 1]) {
          line += '-';
        }
      }

      text += line;
    }

    text += '\n\nhttps://sedordle.com/';
    setResultText(text);
  }, [correctGuessCount, individualScores]);

  const clicked = () => {
    navigator.clipboard.writeText(resultText);

    toast({
      title: 'Results Copied',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Button onClick={clicked} colorScheme="green" rightIcon={<BsShareFill />}>
      Share
    </Button>
  );
}
