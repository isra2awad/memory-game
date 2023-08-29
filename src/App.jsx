import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Cards from "./Components/Cards";
import Header from "./Components/Header";

function App() {
  const [points, setPoints] = useState(0);
  const [clickedCards, setClickedCards] = useState(new Array(8).fill(false)); // Initialize with false values for each card

  const [gifs, setGifs] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const apiKey = "tEXNNBxLBR5zQc5OBN0NfZlwQbNuH5qe";
        const searchQuery = "howls-moving-castle";
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&limit=8`
        );

        setGifs(response.data.data);
      } catch (error) {
        console.error("Error fetching GIFs:", error);
      }
    };

    fetchGifs();
  }, []);

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  function handleShuffleClick() {
    const shuffledGifs = shuffleArray(gifs);
    setGifs(shuffledGifs);
  }

  function handleClick(e) {
    const name = e.target.name;
    const index = parseInt(name.replace("card", "")) - 1;

    if (!clickedCards[index]) {
      // Card not clicked before
      setClickedCards((prevClicked) => {
        prevClicked[index] = true;
        return [...prevClicked];
      });

      setPoints((prevPoints) => prevPoints + 1);
    } else {
      setGameOver(true);
    }
  }
  function start() {
    setGameOver(false);
    setPoints(0);
    setClickedCards(new Array(8).fill(false));
  }

  return (
    <>
      <Header />
      {!gameOver ? (
        <Cards
          handleClick={handleClick}
          gifs={gifs}
          points={points}
          start={start}
        />
      ) : (
        <>
          <h1>Game Over</h1>
          <button onClick={start}>Start again</button>
        </>
      )}
    </>
  );
}

export default App;
