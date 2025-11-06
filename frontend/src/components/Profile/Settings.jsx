import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [Profile, setProfile] = useState();
  const headers = { id: localStorage.getItem("id") };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user",
        { headers }
      );
      setProfile(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const udpateAddress = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/update-address",
      Value,{ headers }
    );
    alert(response.data.msg);
  };
  return (
    <>
      {!Profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {Profile && (
        <div className="h-[100%] p-4 text-zinc-100">
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div className="">
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {Profile.username}
              </p>
            </div>
            <div className="">
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {Profile.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows={5}
              placeholder="Address"
              name="address"
              value={Value.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
              onClick={udpateAddress}
            >
              Update Address
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
