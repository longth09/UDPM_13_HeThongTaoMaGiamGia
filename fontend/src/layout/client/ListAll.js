import { useState, useEffect } from "react";
import axios from "axios";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const ListAll = () => {
  const xKey = "Wb7t8Aobatrxf9wy";
  const [wallID, setWallID] = useState("");
  const [network, setNetwork] = useState("devnet");
  const [isLoaded, setLoaded] = useState(false);
  const [dataFetched, setDataFetched] = useState();
  const [connStatus, setConnStatus] = useState(false);
  localStorage.setItem("privateKey", xKey);
  // Phantom Adaptor
  const solanaConnect = async () => {
    console.log("clicked solana connect");
    const { solana } = window;
    if (!solana) {
      alert("Please Install Solana");
    }

    try {
      //const network = "devnet";
      const phantom = new PhantomWalletAdapter();
      await phantom.connect();
      const rpcUrl = clusterApiUrl(network);
      const connection = new Connection(rpcUrl, "confirmed");
      const wallet = {
        address: phantom.publicKey.toString(),
      };

      if (wallet.address) {
        localStorage.setItem("adressWallet", wallet.address);

        setWallID(wallet.address);
        const accountInfo = await connection.getAccountInfo(
          new PublicKey(wallet.address),
          "confirmed"
        );
        console.log(accountInfo);
        setConnStatus(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNFTs = () => {
    //Note, we are not mentioning update_authority here for now
    let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${wallID}`;
    axios({
      // Endpoint to send files
      url: nftUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": xKey,
      },
      // Attaching the form data
    })
      // Handle the response from backend here
      .then((res) => {
        console.log(res.data);

        setDataFetched(res.data);
        setLoaded(true);
      })

      // Catch errors if any
      .catch((err) => {
        console.warn(err);
      });
  };
  useEffect(() => {
    fetchNFTs();
  }, []);
  const { connection } = useConnection();

  const { publicKey, signTransaction, sendTransaction } = useWallet();

  return (
    <div className="grd-back">
      <div className="container-lg">
        <WalletMultiButton></WalletMultiButton>
      </div>
    </div>
  );
};

export default ListAll;
