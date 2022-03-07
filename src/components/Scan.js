import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import "../scss/Scan.css";

function Scan() {
  const [data, setData] = useState("No result!");
  const [scan, setScan] = useState(false);
  const [buy, setBuyStatus] = useState(false);
  const [productMessage, setProductMessage] = useState(
    "Please Scan QR Code on Product"
  );
  let capture = (
    <QrReader
      onResult={(result, error) => {
        if (result) {
          setData(result?.text);
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
      <h5>{productMessage}</h5>
      <button className="buyButton" onClick={buyBtnHandler}>
        Buy
      </button>
    </>
  );
}

export default Scan;
