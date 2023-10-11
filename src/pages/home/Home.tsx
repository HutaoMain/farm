import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import BestCategories from "../../components/bestCategories/BestCategories";
import BestProducts from "../../components/bestProducts/BestProducts";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <BestCategories />
      <BestProducts />
    </div>
  );
};

export default Home;
