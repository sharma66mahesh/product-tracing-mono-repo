import React from "react";
import { createContext } from "react";
import { getWeb3, getProductContract } from "../ethereum/web3";
import { useState, useEffect } from "react";

export const uploadContext = createContext({
  web3: {},
  productContract: {},
});

function UploadContextProvider(props) {
  const [provider, setProvider] = useState("");
  const [productContract, setProductContract] = useState(null);

  useEffect(() => {
    async function uploadWeb3() {
      const web3 = await getWeb3();
      setProvider(web3);
      const productContract = await getProductContract();
      setProductContract(productContract);
    }
    uploadWeb3();
  }, []);

  return (
    <uploadContext.Provider
      value={{
        web3: provider,
        productContract: productContract,
      }}
    >
      {props.children}
    </uploadContext.Provider>
  );
}

export default UploadContextProvider;
