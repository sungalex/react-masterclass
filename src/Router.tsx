import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";
import Chart from "./Chart";
import Price from "./Price";

function CryptoRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/:coinId" element={<Coin />}>
            <Route path="chart" element={<Chart />} />
            <Route path="price" element={<Price />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default CryptoRouter;
