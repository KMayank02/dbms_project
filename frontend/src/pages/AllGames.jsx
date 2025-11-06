import React, { useState, useEffect } from "react";
import axios from "axios";
import GameCard from "../components/GameCard/GameCard";
import Loader from "../components/Loader/Loader";

const AllGames = () => {
  const [Games, setGames] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/fetch-games"
      );
      setGames(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 px-12 py-8 h-screen">
      <h4 className="text-3xl text-yellow-100">All Games</h4>
      {!Games && (
        <div className="w-full h-screen flex items-center justify-center">
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

export default AllGames;
