import React, { useEffect, useState } from "react";
// Icons
import { RiSearch2Line } from "react-icons/ri";
import {network} from ".././utils/network"


/*
 * The passed callback function will be run when the page loads.
 * More technically, when the App component "mounts".
 */


const Header = () => {

  const [currentAccount, setCurrentAccount] = useState('');
    const [network, setNetwork] = useState('');
    // Implement connectWallet method
    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask -> https://metamask.io/");
                return;
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            // Boom! This should print out public address once we authorize Metamask.
            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }

    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log('Make sure you have metamask!');
            return;
        } else {
            console.log('We have the ethereum object', ethereum);
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log('Found an authorized account:', account);
            setCurrentAccount(account);
        } else {
            console.log('No authorized account found');
        }

        // This is the new part, we check the user's network chain ID
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        setNetwork(networks[chainId]);

        ethereum.on('chainChanged', handleChainChanged);

        // Reload the page when they change networks
        function handleChainChanged(_chainId) {
            window.location.reload();
        }
    };

    const switchNetwork = async () => {
        if (window.ethereum) {
            try {
                // Try to switch to the Mumbai testnet
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x13881' }], // Check networks.js for hexadecimal network ids
                });
            } catch (error) {
                // This error code means that the chain we want has not been added to MetaMask
                // In this case we ask the user to add it to their MetaMask
                if (error.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0x13881',
                                    chainName: 'Polygon Mumbai Testnet',
                                    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                                    nativeCurrency: {
                                        name: "Mumbai Matic",
                                        symbol: "MATIC",
                                        decimals: 18
                                    },
                                    blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                                },
                            ],
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
                console.log(error);
            }
        } else {
            // If window.ethereum is not found then MetaMask is not installed
            alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
        }
    }

    // Render Methods
    const renderNotConnectedContainer = () => (<>
        <div >
            <button onClick={connectWallet} className="px-3 py-2 flex items-center  uppercase font-bold leading-snug text-white hover:opacity-75 rounded-lg bg-black">
                Connect Wallet
            </button>
        </div>
    </>
    );

    const renderConnectedContainer = () => {
        if (network !== 'Polygon Mumbai Testnet') {
            return (<>
                {/* This button will call our switch network function */}
                <button className='px-3 py-2 flex items-center  uppercase font-bold leading-snug text-white hover:opacity-75 rounded-lg bg-black' onClick={switchNetwork}>Switch Network</button>
            </>
            );
        }
        return (<div >
            <p className='px-3 py-2 flex items-center  font-bold leading-snug text-white hover:opacity-75 rounded-lg bg-black'> Wallet: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </p>
        </div>);
    };
    useEffect(() => {
        checkIfWalletIsConnected();
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

      <button className="waveButton" onClick={connectWallet}>
      {!currentAccount && renderNotConnectedContainer()}
      {currentAccount && renderConnectedContainer()}
      </button>



    </header>
  );
};

export default Header;
