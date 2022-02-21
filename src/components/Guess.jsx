import React, { useState } from 'react';

export default function Guess() {
  // eslint-disable-next-line no-unused-vars
  const [letters, setLetters] = useState([]);

  return (
    <div>
      {letters}
    </div>
  );
}
