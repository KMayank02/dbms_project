import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Games, setGames] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-game-by-id/${id}`
      );
      setGames(response.data.data);
    };
    fetch();
  }, []);
  const headers = { id: localStorage.getItem("id"), game_id: id };
  const setFavourite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-fav",
      {},
      { headers }
    );
    alert(response.data.msg);
  };

  const addCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.msg);
  };

  const deleteGame = async () => {
    const response = await axios.delete(
      "http://localhost:1000/api/v1/delete-game",
      { headers }
    );
    alert(response.data.msg);
    navigate("/all-games");
  }

  return (
    <>
      {Games && (
        <div className="px-12 py-8 bg-zinc-900 flex flex-row gap-8 h-screen">
          <div className="  w-3/6 ">
            <div className="flex justify-around bg-zinc-800 rounded p-12">
              <img src={Games?.img_url} className="h-[70vh] rounded" alt="/" />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col items-center justify-start">
                  <button
                    className="bg-white rounded-full text-3xl p-3 text-red-500 flex items-center justify-center"
                    onClick={setFavourite}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className="text-blue-500 rounded-full text-3xl p-3 mt-8 bg-white flex items-center justify-center"
                    onClick={addCart}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-col items-center justify-start">
                  {/* <button className="bg-white rounded-full text-3xl p-3 text-blue-500 flex items-center justify-center">
                    <FaEdit />
                  </button> */}
                  <button
                    className="text-red-500 rounded-full text-3xl p-3 mt-8 bg-white flex items-center justify-center"
                    onClick={deleteGame}
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Games?.title}
            </h1>

            <div className="flex justify-between items-center mt-1 text-zinc-400">
              <p className="text-xl text-zinc-400">{Games?.studio}</p>
              <p className="text-xl text-zinc-400">{Games?.release_year}</p>
            </div>

            <p className="text-zinc-500 mt-2 text-2xl">{Games?.description}</p>
            <p className=" text-zinc-400 mt-2">
              Available on: {Games?.platform}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : Rs. {Games?.price}
            </p>
          </div>
        </div>
      )}
      {!Games && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Details;
