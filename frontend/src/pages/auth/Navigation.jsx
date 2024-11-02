import React from "react";
import { House, ShoppingCart, ShoppingBag, Heart } from 'lucide-react';

const Navigation = () => {
  return (
    <div className="flex my-0 ">
      <div className="flex flex-col justify-between p-4 text-white bg-black m-[4%] hover:w-[15%] h-[100vh] fixed">
        <div
          className="flex flex-col justify-between p-4 text-white bg-black space-y-4"
          
        >
          <div classname=" flex items-center  transition-transform transform hover:translate-x-2">
          <House className='mr-2 cursor-pointer mt-[3rem]'/>
            <span className="hidden md:flex cursor-pointer nav-item-name mt-[3rem] margin-top:100px text-red">
            HOME
            </span>{" "}
          </div>
          
          <div classname=" flex items-center mt-0 mb-0 pt-0 pb-0 transition-transform transform hover:translate-x-2">
          <ShoppingCart className='mr-2 cursor-pointer mt-[3rem]'/>
            <span className="hidden md:flex cursor-pointer nav-item-name mt-[3rem] margin-top:100px text-red">
            SHOPPING CART
            </span>{" "}
          </div>
          <div classname=" flex items-center mt-0 mb-0 pt-0 pb-0 transition-transform transform hover:translate-x-2">
          <ShoppingBag className='mr-2 cursor-pointer mt-[3rem]'/>
            <span className="hidden md:flex cursor-pointer nav-item-name mt-[3rem] margin-top:100px text-red">
            SHOPPING BAG
            </span>{" "}
          </div>
          <div classname=" flex items-center mt-0 mb-0 pt-0 pb-0 transition-transform transform hover:translate-x-2">
          <h className='mr-2 cursor-pointer mt-[3rem]'/>
            <span className="hidden md:flex cursor-pointer nav-item-name mt-[3rem] margin-top:100px text-red">
            FAVOURITE
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
