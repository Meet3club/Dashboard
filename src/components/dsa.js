
import React, { useEffect } from "react";
// Icons
import { RiSearch2Line } from "react-icons/ri";

const getEthereumObject = () => window.ethereum;


/*
 * The passed callback function will be run when the page loads.
 * More technically, when the App component "mounts".
 */


const Header = () => {

  useEffect(() => {
    const ethereum = getEthereumObject();
    if (!ethereum) {
      console.log("Make sure you have metamask!");
    } else {
      console.log("We have the ethereum object", ethereum);
    }
  }, []);


  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold">
        🌞 Good morning, <span className="text-primary-100">0xShikhar</span>
      </h1>
      <form className="w-full md:w-auto">
        <div className="relative">
          <RiSearch2Line className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            type="text"
            className="bg-gray-200 outline-none py-2 pl-8 pr-4 rounded-xl w-full md:w-auto"
            placeholder="Search for projects"
          />
        </div>
      </form>
      {/* //className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" */}

      <button className="waveButton" onClick={null}>
        Connect Wallet
      </button>



    </header>
  );
};

export default Header;
