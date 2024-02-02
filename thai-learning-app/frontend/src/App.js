import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WordCard from './components/WordCard';

function App() {
  const [initialWords, setInitialWords] = useState([]);
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [wordHistory, setWordHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/words')
      .then(response => {
        const fetchedWords = response.data;
        setInitialWords([...fetchedWords]);
        setWords([...fetchedWords]);
        getRandomWord(fetchedWords);
      })
      .catch(error => console.error('Error fetching Thai words:', error));
  }, []);

  const getRandomWord = (currentWords) => {
    const randomIndex = Math.floor(Math.random() * currentWords.length);
    setCurrentWord(currentWords[randomIndex]);
    setWords(prevWords => {
      const updatedWords = [...prevWords];
      updatedWords.splice(randomIndex, 1);
      return updatedWords;
    });
  };

  const handleRandomWord = () => {
    getRandomWord(words);
    setWordHistory(prevHistory => [currentWord, ...prevHistory]);
  };

  const handleClearHistory = () => {
    setWordHistory([]);
    setWords([...initialWords]);
    getRandomWord(initialWords);
  };

  return (
    <div className="container text-center py-5">
      {words.length === 0 ?
        <h4>No more words to learn</h4> :
        <button className="btn btn-dark" onClick={handleRandomWord}>Get Random Word</button>
      }
      {currentWord && <WordCard word={currentWord} />}
      <div className="mt-4">
        <h4>Word History</h4>
        {wordHistory.length > 0 &&
          <button className="btn btn-danger ml-5" onClick={handleClearHistory}>Clear History</button>
        }
        {wordHistory.map((word, index) => (
          <WordCard key={index} word={word} />
        ))}
      </div>
    </div>
  );
}

export default App;
