import "./App.css";
import "react-toastify/dist/ReactToastify.css"; // from react toastify
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify";
import ProductPage from "./pages/productpage/ProductPage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
