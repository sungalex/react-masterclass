import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";

function CryptoRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/:coinId/*" element={<Coin />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default CryptoRouter;
