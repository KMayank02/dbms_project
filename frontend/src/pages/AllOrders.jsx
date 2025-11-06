import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState([]);
  const [Status, setStatus] = useState(-1);
  const [Values, setValues] = useState();
  const headers = {
    id: localStorage.getItem("id"),
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/fetch-orders",
        { headers }
      );
      setAllOrders(response.data.data);
    };
    fetch();
  }, [AllOrders]);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = AllOrders[i]._id;
    const response = await axios.put(
      `http://localhost:1000/api/v1/update-order/${id}`,
      Values,
      { headers }
    );
    alert(response.data.msg);
  };

  const setStatusButton = (i) => {
    setStatus(i);
  };
  return (
    <>
      {!AllOrders && (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {AllOrders && AllOrders.length === 0 && <></>}
      {AllOrders && AllOrders.length > 0 && (
        <div className="h-[100%] p-4 text-zinc-100">
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">S.No.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="">Games</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[11%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-[10%]">
              <h1 className="">Ordered by</h1>
            </div>
          </div>
          {AllOrders &&
            AllOrders.map((items, i) => (
              <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
                <div className="w-[3%]">
                  <h1 className="text-center">{i + 1}</h1>
                </div>
                <div className="w-[22%]">
                  <Link
                    to={`/details/${items.game._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.game.title}
                  </Link>
                </div>
                <div className="w-[45%]">
                  <h1 className="">
                    {items.game.description.slice(0, 50)} ...
                  </h1>
                </div>
                <div className="w-[9%]">
                  <h1 className="">Rs. {items.game.price}</h1>
                </div>
                <div className="w-[11%]">
                  <h1 className="font-semibold">
                    <button
                      className="hover:scale-105 transition-all duration-300"
                      onClick={() => setStatusButton(i)}
                    >
                      {items.status === "Order Placed" ? (
                        <div className="text-yellow-500">{items.status}</div>
                      ) : items.status === "Cancelled" ? (
                        <div className="text-red-500">{items.status}</div>
                      ) : (
                        <div className="text-green-500">{items.status}</div>
                      )}
                    </button>
                    {Status === i && (
                      <div className="flex">
                        <select
                          name="status"
                          id=""
                          className="bg-gray-800"
                          onChange={change}
                        >
                          {[
                            "Order Placed",
                            "Out for Delivery",
                            "Delivered",
                            "Cancelled",
                          ].map((items, i) => (
                            <option value={items} key={i}>
                              {items}
                            </option>
                          ))}
                        </select>
                        <button
                          className="text-gray-500 hover:text-pink-600
                        mx-2"
                          onClick={() => {
                            setStatus(-1);
                            submitChanges(i);
                          }}
                        >
                          <FaCheck />
                        </button>
                      </div>
                    )}
                  </h1>
                </div>
                <div className="w-[10%]">
                  <h1>{items.user.email}</h1>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default AllOrders;
