import React, { useState } from 'react';

export default function Wordle({ guessedWords, targetWord }) {
  // eslint-disable-next-line no-unused-vars
  const [guesses, setGuesses] = useState([]);

  useEffect(() => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wordle">
      {guesses}
    </div>
  );
}
