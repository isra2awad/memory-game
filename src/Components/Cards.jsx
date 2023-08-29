import { useState, useEffect } from "react";

export default function Cards({ gifs, points, handleClick, start }) {
  const [shuffledIndices, setShuffledIndices] = useState([]);
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

  useEffect(() => {
    // Generate an array of indices from 0 to gifs.length - 1
    const indices = Array.from({ length: gifs.length }, (_, index) => index);
    // Shuffle the array of indices
    const shuffled = shuffleArray(indices);
    setShuffledIndices(shuffled);
  }, [gifs, points]);
  return (
    <div>
      {points < 8 ? (
        <div>
          <h1>Score: {points} / 8</h1>
          <div className="card-container">
            {shuffledIndices.map((index) => (
              <img
                key={gifs[index].id}
                src={gifs[index].images.fixed_height.url}
                alt={gifs[index].title}
                name={`card${index + 1}`}
                className="card"
                onClick={handleClick}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <h1>you win !</h1>
          <button onClick={start}>Start again</button>
        </>
      )}
    </div>
  );
}
