import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import "../scss/Scan.css";
import { useContext, useEffect } from "react";
import { uploadContext } from "../ContextAPI/UploadContextProvider";
const product_status = [
  "Fake Product",
  "Original and UnSold ",
  "Orginal and Sold",
  "This is not a product, Please scan another product ",
];

function Scan() {
  const ctx = useContext(uploadContext);
  window.ct = ctx;
  const [data, setData] = useState("No result!");
  const [scan, setScan] = useState(false);
  const [status, setstatus] = useState("");
  const [buy, setBuyStatus] = useState(false);
  const [productMessage, setProductMessage] = useState(
    "Please Scan QR Code on Product to Buy"
  );
  const [currentAccount, setcurrentAccount] = useState("");

  useEffect(() => {}, []);

  async function getData(value) {
    if (!parseInt(value)) {
      setstatus(product_status[3]);
      return product_status[3];
    }
    const data = await ctx.productContract.methods
      .getInfoOfProduct(parseInt(value))
      .call();
    // console.log(product_status[parseInt(data)]);
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
        if (
          parseInt(
            await ctx.productContract.methods
              .getInfoOfProduct(parseInt(data))
              .call()
          )
        ) {
          console.log("ietem");
          ctx.productContract.methods
            .buy(parseInt(data))
            .send({ from: currentAccount[0] });
          setstatus(product_status[2]);
          setProductMessage("Item has been bought");
          setBuyStatus(false);
        }
      }
      onInit();
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
      {scan && <h3>{data}</h3>}
      {scan && <h3>{status}</h3>}
      <h5>{productMessage}</h5>
      <button className="buyButton" onClick={buyBtnHandler}>
        Buy
      </button>
    </>
  );
}

export default Scan;
