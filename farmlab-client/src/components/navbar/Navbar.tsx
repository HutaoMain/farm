import "./Navbar.css";
import { LocalMall } from "@mui/icons-material";
import logo from "../../assets/logo.png";
import { Drawer } from "antd";
// import Checkout from "../checkout/Checkout";
import { useState } from "react";
import { Badge, Dialog, DialogContent } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../zustand/CartStore";
// import Login from "../login/Login";
import { Transition } from "../../types/Types";

import useAuthStore from "../../zustand/AuthStore";
import Login from "../login/Login";
// import axios from "axios";

const Navbar = () => {
  // const [userData, setUserData] = useState<UserInterface>();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  // const [showManagementDropdown, setShowManagementDropdown] =
  //   useState<boolean>(false);

  const cart = useCartStore((state) => state.items);
  const user = useAuthStore((state) => state.user);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_APP_BASE_URL}/api/user/${user}`
  //     );
  //     setUserData(res.data);
  //   };
  //   fetch();
  // }, []);

  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onCloseDrawer = () => {
    setOpen(false);
  };

  // const toggleManagementDropdown = () => {
  //   setShowManagementDropdown(!showManagementDropdown);
  // };

  const handleHome = () => {
    navigate("/");
  };

  const toggleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <div className="nav">
      <div
        style={{
          backgroundColor: "#08C25E",
          width: "100%",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: "1050px", width: "100%" }}>
          <span style={{ color: "white" }}>Welcome to our Online Store</span>
        </div>
      </div>
      <div className="nav-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="moditect logo" className="nav-logo" />
        </Link>
        <section className="nav-link-container">
          <span className="nav-link" onClick={handleHome}>
            HOME
          </span>
          <a
            href="#best-products"
            style={{ textDecoration: "none", color: "black" }}
          >
            <span className="nav-link">SHOP</span>
          </a>
          <a
            href="#location"
            style={{ textDecoration: "none", color: "black" }}
          >
            <span className="nav-link">OUR LOCATION</span>
          </a>
          <a href="#footer" style={{ textDecoration: "none", color: "black" }}>
            <span className="nav-link">CONTACT</span>
          </a>
          {/* {userData?.userRole === "ROLE_ADMIN" && (
            <div className="nav-dropdown" onClick={toggleManagementDropdown}>
              <span className="nav-link">MANAGEMENT</span>
              {showManagementDropdown && (
                <div
                  className="dropdown-content"
                  style={
                    showManagementDropdown
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <Link style={{ textDecoration: "none" }} to="/admin/products">
                    <span>PRODUCT MANAGEMENT</span>
                  </Link>
                  <span>ITEM 2</span>
                  <span>ITEM 3</span>
                </div>
              )}
            </div>
          )} */}
        </section>
        <section className="nav-action-container">
          {user ? (
            <span>{user}</span>
          ) : (
            <button className="nav-btn" onClick={toggleLoginModal}>
              LOGIN
            </button>
          )}
          <Badge
            badgeContent={cart.length}
            color="primary"
            onClick={showDrawer}
          >
            <LocalMall sx={{ color: "black" }} />
          </Badge>
        </section>
      </div>
      <Dialog
        open={isLoginOpen}
        onClose={toggleLoginModal}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogContent>
          <Login />
        </DialogContent>
      </Dialog>
      <Drawer placement="right" onClose={onCloseDrawer} open={open}>
        {/* <Checkout /> */}
      </Drawer>
    </div>
  );
};

export default Navbar;
