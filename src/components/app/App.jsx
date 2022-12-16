import { BrowserRouter, Routes, Route} from "react-router-dom";

import Layout from '../layout/Layout';

import Mint from '../content/mint/Mint';
import Home from '../content/home/Home';
import { useEffect } from "react";

const App = () => {

  useEffect(() => {
    document.body.className = "bg-gradient-to-r from-purple-600/80 to-purple-600/80 via-indigo-600/80 text-slate-100"
  })
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mint" element={<Mint/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
