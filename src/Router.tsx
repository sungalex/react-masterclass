import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";

function CryptoRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to="/react-masterclass" />}
          />
          <Route path="/react-masterclass" element={<Coins />}></Route>
          <Route path="/react-masterclass/:coinId/*" element={<Coin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default CryptoRouter;
