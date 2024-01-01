import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { Person } from "@mui/icons-material";
import useAuthStore from "../../zustand/AuthStore";

const Sidebar = () => {
  const location = useLocation();

  const user = useAuthStore((state) => state.user);

  const clearUser = useAuthStore((state) => state.clearUser);

  return (
    <div className="sidebar">
      <div className="sidebar-top-admin">
        <Person sx={{ fontSize: "40px" }} />
        <span
          style={{ wordWrap: "break-word", width: "75%", textAlign: "center" }}
        >
          {user}
        </span>
      </div>

      <hr className="sidebar-hr" />
      <div className="sidebar-center">
        <ul>
          <p className="sidebar-title">Dashboard</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className={location.pathname === "/" ? "sidebar-active" : ""}>
              <span
                className={
                  location.pathname === "/"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Dashboard
              </span>
            </li>
          </Link>

          {/*  */}
          <p className="sidebar-title">Supplier Inventory Management</p>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/categories" ? "sidebar-active" : ""
              }
            >
              {/* <DashboardIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/categories"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Categories
              </span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li
              className={
                location.pathname === "/products" ? "sidebar-active" : ""
              }
            >
              {/* <DashboardIcon className="icon" /> */}
              <span
                className={
                  location.pathname === "/products"
                    ? "sidebar-active"
                    : "sidebar-title-span"
                }
              >
                Products
              </span>
            </li>
          </Link>

          <li style={{ marginTop: "10px" }} onClick={clearUser}>
            {/* <ExitToAppIcon className="icon" /> */}
            <span className="sidebar-title-span">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
