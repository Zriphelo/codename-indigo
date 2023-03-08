import { BrowserRouter, Routes, Route} from "react-router-dom";

import Layout from '../Layout';

import Home from '../Content/Home';
import CoinInfo from "../Content/Coin/Info";
import CoinMint from '../Content/Coin/Mint';
import CoinTransfer from "../Content/Coin/Transfer";
import { useEffect } from "react";
import Coin from "../Content/Coin";
import NFT from "../Content/NFT";

const App = () => {

  useEffect(() => {
    // document.body.className = "bg-gradient-to-r from-purple-600/80 to-purple-600/80 via-indigo-600/80"
    document.body.className = "bg-indigo-600/60"
  })
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="fungible" element={<Coin/>}>
            <Route path="info" element={<CoinInfo/>}/>
            <Route path="mint" element={<CoinMint/>}/>
            <Route path="transfer" element ={<CoinTransfer/>}/>
          </Route>
          <Route path="nonfungible" element={<NFT/>}>

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
