import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import "../scss/Scan.css";
import { useContext, useEffect } from "react";
import { uploadContext } from "../ContextAPI/UploadContextProvider";
const product_status = ["Fake", "Original and UnSold ", "Sold"];

function Scan() {
  const ctx = useContext(uploadContext);
  const [data, setData] = useState("No result!");
  const [scan, setScan] = useState(false);
  const [status, setstatus] = useState("Getting Data");
  const [buy, setBuyStatus] = useState(false);
  const [productMessage, setProductMessage] = useState(
    "Please Scan QR Code on Product to Buy"
  );
  const [currentAccount, setcurrentAccount] = useState("");

  useEffect(() => {}, []);

  async function getData(value) {
    const data = await ctx.productContract.methods
      .getInfoOfProduct(parseInt(value))
      .call();
    setstatus(product_status[parseInt(data)]);
    return product_status[parseInt(data)];
  }

  let capture = (
    <QrReader
      onResult={(result, error) => {
        if (result) {
          setData(result?.text);
          getData(result?.text);
          setProductMessage("Scanning QR Code");
          setBuyStatus(true);
          setTimeout(() => {
            setProductMessage("QR Code scanned");
          }, 500);
        }
        if (error) {
          console.info(error);
        }
      }}
      style={{ width: "50%" }}
    />
  );

  const buyBtnHandler = () => {
    if (buy) {
      async function onInit() {
        window.ethereum.on("accountsChanged", function (accounts) {
          setcurrentAccount(accounts);
        });
      }
      onInit();
      console.log(currentAccount[0]);
      ctx.productContract.methods
        .buy(parseInt(data))
        .send({ from: currentAccount[0] });
      setProductMessage("Item has been bought");
    } else {
      //   setProductMessage("Item has already been or not bought");
      setBuyStatus(false);
    }
  };

  const scanBtnHandler = () => {
    setScan(true);
  };

  return (
    <>
      {!scan && (
        <button className="scanBtn" onClick={scanBtnHandler}>
          Scan QRcode
        </button>
      )}
      {scan && capture}
      <h3>{data}</h3>
      <h3>{status}</h3>
      <h5>{productMessage}</h5>
      <button className="buyButton" onClick={buyBtnHandler}>
        Buy
      </button>
    </>
  );
}

export default Scan;
