import "./App.css";
import { Route, Routes } from "react-router-dom";
import USDToOrther from "./USDToOrther";
import OtherToUSD from "./OtherToUSD";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<OtherToUSD />} />
        <Route path="/USDToOrther" element={<USDToOrther />} />
      </Routes>
    </>
  );
}

export default App;
