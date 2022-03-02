import logo from "./logo.svg";
import "./App.css";
// import { ethers } from "ethers";
import Web3 from "web3";

function App() {
  let web3 = new Web3("HTTP://127.0.0.1:8545");
  console.log(
    web3.eth.getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
  );

  return (
    <>
      <h1>hellow world</h1>
      {web3.eth.accounts[0]}
    </>
  );
}

export default App;
