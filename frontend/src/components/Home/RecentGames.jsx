import React, { useState, useEffect } from "react";
import axios from "axios";
import GameCard from "../GameCard/GameCard";
import Loader from "../Loader/Loader";

const RecentGames = () => {
  const [Games, setGames] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/recent-games"
      );
      setGames(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Hot Off the Press</h4>
      {!Games && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-8 grid grid-cols-4 gap-8">
        {Games &&
          Games.map((items, i) => (
            <div key={i}>
              <GameCard data={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentGames;
