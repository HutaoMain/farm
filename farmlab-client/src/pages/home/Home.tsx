import "./Home.css";
import Header from "../../components/header/Header";
import BestCategories from "../../components/bestCategories/BestCategories";
import BestProducts from "../../components/bestProducts/BestProducts";
import ScrollToTheTop from "../../components/scroll/ScrollToTheTop";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <ScrollToTheTop />
      <div className="home-container">
        <BestCategories />
        <BestProducts />
        <div className="google-map-container" id="location">
          <h1 className="google-map-title">You can find us here!</h1>
          <iframe
            className="google-map-embed"
            src="https://www.google.com/maps/embed/v1/place?q=Hacienda+888+Stradale,+Silang,+Cavite,+Philippines&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Home;
