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
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );
  return productContract;
};
