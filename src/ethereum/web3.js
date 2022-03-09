import Web3 from "web3";
import product from "../artifacts/contracts/Product.sol/Product.json";
import { detectMetamask } from "../utils";

export const getWeb3 = async () => {
  const walletAvailable = await detectMetamask();
  if (!walletAvailable) {
    throw "Metamask not detected";
  }
  // await window.ethereum.enable();
  const web3 = new Web3("HTTP://127.0.0.1:8545");
  return web3;
};

export const getProductContract = async () => {
  const web3 = await getWeb3();
  const productContract = await new web3.eth.Contract(
    product.abi,
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
  );
  return productContract;
};
