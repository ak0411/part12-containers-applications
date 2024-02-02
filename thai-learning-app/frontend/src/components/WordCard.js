import React, { useEffect, useState } from 'react';

const WordCard = (props) => {
  const { word, romanization, translation } = props.word;

  const [revealRomanization, setRevealRomanization] = useState(false);
  const [revealTranslation, setRevealTranslation] = useState(false);

  useEffect(() => {
    setRevealRomanization(false);
    setRevealTranslation(false);
  }, [word]);

  const handleRomanizationClick = () => {
    setRevealRomanization(!revealRomanization);
  };

  const handleTranslationClick = () => {
    setRevealTranslation(!revealTranslation);
  };

  return (
    <div className="card mx-auto my-3" style={{ width: '25rem' }}>
      <div className="card-body">
        <p className="card-text">Thai: {word}</p>
        <p
          className={`card-text ${revealRomanization ? 'font-weight-bold' : 'font-weight-light'}`}
          onClick={handleRomanizationClick}
        >
          Romanization: {revealRomanization ? romanization : 'Click to Reveal'}
        </p>
        <p
          className={`card-text ${revealTranslation ? 'font-weight-bold' : 'font-weight-light'}`}
          onClick={handleTranslationClick}
        >
          Translation: {revealTranslation ? translation : 'Click to Reveal'}
        </p>
      </div>
    </div>
  );
};

export default WordCard;
