import React, { useEffect, useState } from 'react';
import Keyboard from './Keyboard';
import Wordle from './Wordle';

export default function GameBoard() {
  const [targetWord, setTargetWord] = useState('');
  const [wordles, setWordles] = useState([]);
  const [guessedWords, setGuessedWords] = useState([]);

  useEffect(() => {
    setTargetWord('ghoul');
    setGuessedWords(['minty', 'bears']);
    setWordles([<Wordle guessedWords={guessedWords} targetWord={targetWord} />]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        {wordles}
      </div>
      <Keyboard />
    </div>
  );
}
