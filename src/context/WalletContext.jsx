import React, { useEffect, useState } from "react";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const contractJson = require("../assets/abi/Indigo.json")

const Context = React.createContext(null)

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID, // required
    },
  }
}
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

const ProviderWrapper = (props) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isGoerli, setIsGoerli] = useState(false);
    const [signer, setSigner] = useState(undefined);
    const [walletAddress, setWalletAddress] = useState(undefined);
    const [provider, setProvider] = useState(undefined);
    const [contract, setContract] = useState(undefined);
    
    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions
    })

    const connect = async () => {
        try {
            const modalProvider = await web3Modal.connect()
            const tProvider = new providers.Web3Provider(modalProvider)
            const tSigner = tProvider.getSigner()

            setProvider(tProvider);
            setSigner(tSigner);
            setWalletAddress(await tSigner.getAddress())
            let network = await tProvider.getNetwork();
            
            // eslint-disable-next-line
            if (network.chainId == 5) setIsGoerli(true);

            tProvider.provider.on("accountsChanged", (accounts) => {
              if(accounts.length <= 0) disconnect();
              else {
                setWalletAddress(accounts[0]);
                setSigner(tProvider.getSigner());
              }
            });
            tProvider.provider.on("chainChanged", (chainId) => {
              // eslint-disable-next-line
              (chainId == 5) ? setIsGoerli(true) : setIsGoerli(false);
            });
            tProvider.provider.on("disconnect", (error) => {
              disconnect();
            });

            setIsConnected(true);

        } catch(e) {
            console.log("Could not get a wallet connection", e);
            return;
        }
    }

    const disconnect = async () => {
        web3Modal.clearCachedProvider();

        setIsConnected(false);
        setIsGoerli(false);
        setSigner(undefined);
        setWalletAddress(undefined);
        setProvider(undefined);
    }

    // Whenever the window launches,
    useEffect(() => {
      if(web3Modal.cachedProvider) {
        connect();
      } // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (signer) {
            const tContract = new ethers.Contract(contractAddress, contractJson.abi, signer)
            setContract(tContract)
        }
    }, [signer])
    
    // Context exposed values -----------------------------------------------------------
    const exposedValue = {
        connect,
        disconnect,
        isConnected,
        isGoerli,
        address: walletAddress,
        signer,
        provider,
        contract
    }
    
    return <Context.Provider value={exposedValue}>
        { props.children }
    </Context.Provider>    
}
    
export {    
    Context,
    ProviderWrapper,    
}    
