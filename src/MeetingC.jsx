import reactLogo from "./assets/react.svg";
// import "./App.css";
import React, { useEffect, useState } from "react";
import { doc, setDoc, getDocs,updateDoc, collection, query, where, limit, onSnapshot } from "firebase/firestore";
import { myDatabase } from "./firebaseInit"
import { networks } from './utils/networks';

import {
  HuddleClientProvider,
  getHuddleClient,
} from "@huddle01/huddle01-client";

import { useHuddleStore } from "@huddle01/huddle01-client/store";
import PeerVideoAudioElem from "./components/PeerVideoAudioElem";
import MeVideoElem from "./components/MeVideoElem";

function MeetingC() {
  const huddleClient = getHuddleClient("6cf466614f891d0d82f5ad03c58924894ee37accbea11efc08f63bdd0d30dfc9");
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
  const lobbyPeers = useHuddleStore((state) => state.lobbyPeers);
  const roomState = useHuddleStore((state) => state.roomState);
  const recordingState = useHuddleStore((state) => state.recordingState);
  const recordings = useHuddleStore((state) => state.recordings);


  const [currentAccount, setCurrentAccount] = useState('');
  const [network, setNetwork] = useState('');
  const [status, setStatus] = useState(false);
  const [roomID, setRoomID] = useState('');

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
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

    const chainId = await ethereum.request({ method: 'eth_chainId' });
    setNetwork(networks[chainId]);

    ethereum.on('chainChanged', handleChainChanged);

    function handleChainChanged(_chainId) {
      window.location.reload();
    }
  };

  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }],
        });
      } catch (error) {
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
      alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
    }
  }

    // Render Methods
    const renderNotConnectedContainer = () => (<>
      <center>
        <div className="text-6xl pt-32">
          <button onClick={connectWallet} className="rounded-lg bg-yellow-400 hover:opacity-75 p-8">
            Connect Wallet
          </button>
        </div>
      </center>
    </>
    );
    const renderFinderContainer = () => {
      /////////////   THE FINDER CONTAINER   /////////////
      return (
        <div>
          <button onClick={findMatch}>Find</button>
        </div>
      );
      /////////////  THE FINDER CONTAINER   /////////////
    }
  
    const renderMeetContainer = () => {
      /////////////   THE MEET CONTAINER   /////////////
      return (
        <div>
          <HuddleClientProvider value={huddleClient}>
      <h2 className={`text-${!roomState.joined ? "red" : "green"}`}>
            o
          </h2>

          
      <div className="">
        <div className = "">
          <MeVideoElem />
        </div>

        <div className = "">
            <div className="">
            {peersKeys.map((key) => (
              <PeerVideoAudioElem key={`peerId-${key}`} peerIdAtIndex={key} />
            ))}
          </div>
        </div>
      </div>
      <div className="">
            <button onClick={handleJoin}>Join Room</button>
            <button onClick={() => huddleClient.enableWebcam()}>
              Enable Webcam
            </button>
            <button onClick={() => huddleClient.disableWebcam()}>
              Disable Webcam
            </button>
            <button onClick={() => huddleClient.allowAllLobbyPeersToJoinRoom()}>
              allowAllLobbyPeersToJoinRoom()
            </button>
          </div>
    </HuddleClientProvider>
        </div>
      );
      /////////////  THE MEET CONTAINER   /////////////
    }
    const renderConnectedContainer = () => {
      if (network !== 'Polygon Mumbai Testnet') {
        return (<>
          <center>
            <div className="text-6xl pt-32">
              <h2>Please switch to Polygon Mumbai Testnet</h2>
              <br />
              <button className='rounded-lg bg-yellow-400 hover:opacity-75 p-8' onClick={switchNetwork}>Click here to switch</button>
            </div>
          </center>
        </>
        );
      }
      return (<div >
        <div>
          {!status && renderFinderContainer()}
          { status && renderMeetContainer()}
        </div>
      </div>);
    };
  
    useEffect(() => {
      checkIfWalletIsConnected();
    }, []);
  
    const findMatch = async () => {
  
      const q = query(collection(myDatabase, "Users"), where("status", "==", false), limit(1));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size != 0) {
        querySnapshot.forEach((doc) => {
          setRoomID(doc.id)
          console.log(doc.id, " => ", doc.data().status);
        });
  
        console.log("Found Room Match")
        await updateDoc(doc(myDatabase, "Users", roomID), {
          status: true
        });
        console.log("Set Status to true")
  
        setStatus(true)
  
        console.log("joined" + roomID)
      }
      else {
        console.log("Not Found")
        await setDoc(doc(myDatabase, "Users", currentAccount), {
          type: "punk",
          status: false
        });
  
        setRoomID(currentAccount);
        
        console.log("Created Room")
  
        console.log("Waiting for Participant")
  
        const unsub = onSnapshot(doc(myDatabase, "Users", currentAccount), (doc) => {
          console.log("Current data: ", doc.data());
          if(doc.data().status==true){
            setStatus(true)
            
          }
        });
        
      }
    }

  const handleJoin = async () => {
    try {
      await huddleClient.join(roomID, {
        address: currentAccount,
        wallet: "",
        ens: "axit.eth",
      });

      console.log("joined");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
    <div>
        {!currentAccount && renderNotConnectedContainer()}
        {currentAccount && renderConnectedContainer()}
      </div>
    </>
  );
}

export default MeetingC;
