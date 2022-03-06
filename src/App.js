import "./App.css";
import greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Web3 from "web3";

function App() {
  let web3 = new Web3("HTTP://127.0.0.1:8545");
  // console.log(greeter.contractName);
  const init = async () => {
    const id = await web3.eth.net.getId();
    // const deployedNetwork = greeter.netorks[id];
    const contract = new web3.eth.Contract(
      greeter.abi,
      "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"
    );
    const res = await contract.methods.greet().call();
    console.log(res);
  };
  init();
  return (
    <>
      <h1>hellow world</h1>
      {web3.eth.accounts[0]}
    </>
  );
}

export default App;
