import React from "react";
import { Link } from "react-router-dom";
import { FaWindows, FaPlaystation, FaXbox } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";
import axios from "axios";

const GameCard = ({ data, isFavourite }) => {
  const headers = { id: localStorage.getItem("id"), game_id: data._id };

  const removeFav = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/remove-fav",
      {},
      { headers }
    );
    alert(response.data.msg);
  };
  // console.log(data);
  const getPlatformIcons = (platformString) => {
    const icons = [];
    const lowerPlatform = platformString.toLowerCase();

    if (lowerPlatform.includes("pc") || lowerPlatform.includes("windows")) {
      icons.push(<FaWindows key="pc" title="PC" className="text-blue-400" />);
    }
    if (lowerPlatform.includes("playstation") || lowerPlatform.includes("ps")) {
      icons.push(
        <FaPlaystation
          key="ps"
          title="PlayStation"
          className="text-indigo-500"
        />
      );
    }
    if (lowerPlatform.includes("xbox")) {
      icons.push(<FaXbox key="xbox" title="Xbox" className="text-green-500" />);
    }
    if (lowerPlatform.includes("nintendo")) {
      icons.push(
        <SiNintendoswitch
          key="switch"
          title="Nintendo Switch"
          className="text-red-500"
        />
      );
    }

    return icons;
  };

  return (
    <div className="bg-zinc-800 rounded p-4 hover:bg-zinc-700 hover:shadow-lg transition-all flex flex-col">
      <Link to={`/details/${data._id}`}>
        <div className="">
          <div className="relative z-10 rounded-lg overflow-hidden h-[25vh]">
            <div
              className="absolute inset-0 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${data.img_url})`,
                backgroundSize: "150%",
                backgroundPosition: "center",
                filter: "blur(8px)",
              }}
            ></div>
          </div>
          <div className="relative -mt-[25vh] z-10 flex items-center justify-center ">
            <img src={data.img_url} alt={data.title} className="h-[25vh]" />
          </div>
          <div className="flex items-center justify-between">
            <h2 className="mt-4 text-xl text-white font-semibold">
              {data.title}
            </h2>
            <div className="flex items-center gap-3 mt-3 text-2xl">
              {getPlatformIcons(data.platform)}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 text-zinc-400">
            <p className="font-semibold">{data.studio}</p>
            <p className="font-semibold">{data.release_year}</p>
          </div>

          <p className="mt-4 text-xl text-zinc-200 font-bold">
            Rs. {data.price}
          </p>
        </div>
      </Link>
      {isFavourite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={removeFav}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default GameCard;
