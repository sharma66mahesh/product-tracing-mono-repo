import React from "react";
import { useRef } from "react";

function InputField({ getNumber }) {
  const dateOfManufacture = useRef(null);
  const productNumber = useRef(null);

  const handleForm = (event) => {
    event.preventDefault();
    if (productNumber.current.value === "") {
      productNumber.current.focus();
      if (dateOfManufacture.current.value === "") {
        dateOfManufacture.current.focus();
      }
      return false;
    }
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
