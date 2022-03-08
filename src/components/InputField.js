import React from "react";
import { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import { uploadContext } from "../ContextAPI/UploadContextProvider";

function InputField({ getNumber }) {
  const dateOfManufacture = useRef(null);
  const productNumber = useRef(null);
  const ctx = useContext(uploadContext);
  const [accounts, setaccounts] = useState("");
  useEffect(() => {
    async function init() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setaccounts(accounts);
    }
    init();
  }, []);

  const handleForm = (event) => {
    event.preventDefault();
    if (productNumber.current.value === "") {
      productNumber.current.focus();
      return false;
    }
    if (dateOfManufacture.current.value === "") {
      dateOfManufacture.current.focus();
      return false;
    }
    // window.ct = ctx;
    // console.log(typeof(accounts[0]));
    ctx.productContract.methods
      .registerProduct(
        dateOfManufacture.current.value,
        productNumber.current.value
      )
      .send({ from: accounts[0] });

    getNumber(productNumber.current.value);
    dateOfManufacture.current.value = "";
    productNumber.current.value = "";
  };

  return (
    <>
      <form onSubmit={handleForm}>
        <label htmlFor="dateOfManufactuer">Date of Manufacture: </label>
        <input
          type="text"
          id="dateOfManufactuer"
          ref={dateOfManufacture}
        ></input>
        <br />
        <label htmlFor="ProductNumber">Product Number: </label>
        <input type="text" id="ProductNumber" ref={productNumber}></input>
        <button type="submit">Add Product</button>
      </form>
    </>
  );
}

export default InputField;
