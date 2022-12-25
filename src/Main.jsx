import React, { useEffect, useState } from "react";
import { useFetchData } from "./useFetchData";

const generateRandomNumber = () => {
  const min = 0;
  const max = 150;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const Main = () => {
  const [requestUrl, setRequestUrl] = useState(
    `https://rickandmortyapi.com/api/character/1`
  );
  const [tick, setTick] = useState(false);
  const [cross, setCross] = useState(false);

  const { data } = useFetchData(requestUrl);

  const reset = () => {
    setTimeout(() => {
      const number = generateRandomNumber();
      setRequestUrl(`https://rickandmortyapi.com/api/character/${number}`);
    }, 3000);
  };

  useEffect(() => {
    setCross(false);
    setTick(false);
  }, [requestUrl]);

  return (
    <div className="card-container">
      <div>
        <img src={data.image} className="card-image" />
        <h4 className="card-name">{data.name}</h4>
      </div>
      <div className="card-symbol-container">
        {tick && (
          <span class="material-symbols-outlined card-symbols card-done-symbol-tick">
            done
          </span>
        )}
        {cross && (
          <span class="material-symbols-outlined card-symbols card-done-symbol-cross">
            cancel
          </span>
        )}
      </div>

      <div className="card-buttons-pair">
        <button
          className="card-button card-button-alive"
          onClick={() => {
            if (data.status === "Alive" || data.status === "unknown")
              setTick(true);
            else setCross(true);

            reset();
          }}
        >
          Alive
        </button>
        <button
          className="card-button card-button-cancel"
          onClick={() => {
            if (data.status === "Dead") setTick(true);
            else setCross(true);

            reset();
          }}
        >
          Dead
        </button>
      </div>
    </div>
  );
};