import axios from "axios";
import React, { useState } from "react";

const AddGame = () => {
  const [Data, setData] = useState({
    img_url: "",
    title: "",
    platform: "",
    studio: "",
    release_year: "",
    description: "",
    price: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.img_url === "" ||
        Data.title === "" ||
        Data.platform === "" ||
        Data.studio === "" ||
        Data.release_year === "" ||
        Data.description === "" ||
        Data.price === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/add-game",
          Data,
          { headers }
        );
        setData({
          img_url: "",
          title: "",
          platform: "",
          studio: "",
          release_year: "",
          description: "",
          price: "",
        });
        alert(response.data.msg);
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div className="h-[100%] p-4">
      <h1 className="text-5xl font-semibold text-zinc-500 mb-8">Add Game</h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label htmlFor="" className="text-zinc-400">
            Image
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Image Url"
            name="img_url"
            required
            value={Data.img_url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Game Title
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Game Title"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Developer
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Game Developer"
              name="studio"
              required
              value={Data.studio}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Year of Release
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Release Year"
              name="release_year"
              required
              value={Data.release_year}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Available Platforms
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Platforms"
              name="platform"
              required
              value={Data.platform}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Price
            </label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Price"
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Description
          </label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            rows={5}
            placeholder="Description"
            name="description"
            required
            value={Data.description}
            onChange={change}
          />
        </div>
        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
          onClick={submit}
        >
          Add Game
        </button>
      </div>
    </div>
  );
};

export default AddGame;
