import Web3 from "web3";
import product from "./artifacts/contracts/Product.sol/Product.json";

let web3 = new Web3("HTTP://127.0.0.1:8545");

const init = async () => {
  //   const id = await web3.eth.net.getId();
  // const deployedNetwork = greeter.netorks[id];
  const contract = new web3.eth.Contract(
    product.abi,
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );
  const res = await contract.methods.getInfoOfProduct(1).call();
  console.log(res);
};
// init();

export default web3;
