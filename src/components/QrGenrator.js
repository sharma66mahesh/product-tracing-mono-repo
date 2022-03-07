import React from "react";
import QRCode from "qrcode.react";
import "../scss/QrGenerator.css";

function QrGenrator({ sourceData }) {
  const downloadQR = () => {
    const canvas = document.getElementById("qr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "product.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <QRCode id="qr" value={sourceData} size={290} level={"H"} />
      <button onClick={downloadQR}> Download QR </button>
    </>
  );
}

export default QrGenrator;
