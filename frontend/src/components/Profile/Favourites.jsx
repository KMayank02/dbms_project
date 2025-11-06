import axios from "axios";
import React, { useEffect, useState } from "react";
import GameCard from "../GameCard/GameCard";

const Favourites = () => {
  const [FavouriteGames, setFavouriteGames] = useState([]);
  const headers = { id: localStorage.getItem("id") };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/fetch-fav",
        { headers }
      );
      setFavouriteGames(response.data.data);
    };
    fetch();
  }, [FavouriteGames]);

  return (
    <>
      {FavouriteGames.length === 0 && (
        <div className="text-4xl h-[100%] font-semibold text-zinc-500 flex items-center justify-center">
          No FavouriteGames Added
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {FavouriteGames &&
          FavouriteGames.map((items, i) => (
            <div key={i}>
              <GameCard data={items} isFavourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
