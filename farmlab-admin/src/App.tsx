import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import useAuthStore from "./zustand/AuthStore";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login";
import Product from "./pages/product/Product";
import Order from "./pages/order/Order";
import Category from "./pages/category/Category";

function App() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="app">
      {user ? <Sidebar /> : <></>}
      <div className="app-body">
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/products"
            element={user ? <Product /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={user ? <Order /> : <Navigate to="/login" />}
          />
          <Route
            path="/categories"
            element={user ? <Category /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
