import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState();
  const headers = { id: localStorage.getItem("id") };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/fetch-cart",
        { headers }
      );
      setCart(response.data.data);
    };
    fetch();
  }, [Cart]);

  const deleteItem = async (game_id) => {
    const response = await axios.put(
      `http://localhost:1000/api/v1/remove-from-cart/${game_id}`,
      {},
      { headers }
    );
    alert(response.data.msg);
  };

  useEffect(() => {
    if(Cart && Cart.length>0)
    {
      let total = 0;
      Cart.map((items)=>{
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [Cart]);

  const placeOrder = async () => {
    try {
      const response = await axios.post(
      `http://localhost:1000/api/v1/place-order`,
      {order_list: Cart},
      { headers }
    );
    alert(response.data.msg);
    navigate("/")
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      {!Cart && <div className="w-full h-[100%] flex items-center justify-center"><Loader /></div>}
      {Cart && Cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl font-semibold text-zinc-400">
              Your Cart is Empty
            </h1>
          </div>
        </div>
      )}
      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {Cart.map((items, i) => (
            <div
              className="w-full my-4 rounded flex flex-row p-4 bg-zinc-800  justify-between items-center"
              key={i}
            >
              <img
                src={items.img_url}
                alt="/"
                className="h-[10vh] object-cover"
              />
              <div className="w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start">
                  {items.title}
                </h1>
                <p className="text-base text-zinc-300 mt-2 block">
                  {items.description.slice(0, 100)}...
                </p>
                <p className="text-base text-zinc-300 mt-2 hidden">
                  {items.description.slice(0, 65)}...
                </p>
                <p className="text-base text-zinc-300 mt-2 hidden">
                  {items.description.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  Rs. {items.price}
                </h2>
                <button
                  className="text-2xl text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => deleteItem(items._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {Cart && Cart.length>0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-200 font-semibold">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{Cart.length} Games</h2> <h2>Rs. {Total}</h2>
              </div>
              <div className="w-[100%] mt-3">
                <button className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-500" 
                onClick={placeOrder} 
                >
                  Place Order
                </button>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
