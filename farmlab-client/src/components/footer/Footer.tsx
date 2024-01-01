import "./Footer.css";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-container">
        <img src={logo} alt="logo" className="footer-logo" />
        <span>Copyright ©2023 Farm Lab. All rights reserved.</span>
        <div className="footer-contact-info">
          <label className="footer-contact">
            Email:
            <span>admin@farmlab.ph</span>
          </label>
          <label className="footer-contact">
            Contact Number:
            <span>0966-523-5629</span>
          </label>
        </div>
      </div>
      <div className="footer-container-bottom"></div>
    </div>
  );
};

export default Footer;
