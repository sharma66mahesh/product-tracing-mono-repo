import React, { useState } from "react";
import InputField from "./InputField";
import QrGenrator from "./QrGenrator";

function Register() {

  const [sourceData, setSourceData] = useState("");

  function getNumber(value) {

    setSourceData(value);
  }

  return (
    <>
      <h1>Register Product</h1>
      <InputField getNumber={getNumber} />
      <QrGenrator sourceData={sourceData} />
    </>
  );
}

export default Register;
