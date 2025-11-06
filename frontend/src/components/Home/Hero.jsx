import React from "react";
import hero from "../../assets/hero.png"
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[75vh] flex">
      <div className="w-3/6 flex flex-col items-start  justify-center">
        <h1 className="text-6xl font-semibold text-yellow-100 text-left">
          Discover Your Next Adventure
        </h1>
        <p className="mt-4 text-xl text-zinc-300 text-left">
          Embark on unforgettable journeys, conquer epic challenges, and
          experience endless adventures in our curated collection of video games
        </p>
        <div className="mt-8">
          <Link to='/all-games ' className="text-yellow-100 text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full">
            Discover Games
          </Link>
        </div>
      </div>
      <div className="w-3/4 l h-[100%] flex items-center justify-center">
        <img src={hero}  alt="hero"/>
      </div>
    </div>
  );
};

export default Hero;
