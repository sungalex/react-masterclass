import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

function CryptoRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/:coinId" element={<Coin />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default CryptoRouter;
