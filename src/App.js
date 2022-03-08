import "./scss/App.css";
import Customer from "./components/Customer";
import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { uploadContext } from "./ContextAPI/UploadContextProvider";

function App() {
  const ctx = useContext(uploadContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Customer />}></Route>
        <Route path="/customer" element={<Customer />}></Route>
        {<Route path="/register" element={<Register />}></Route>}
      </Routes>
    </>
  );
}

export default App;
