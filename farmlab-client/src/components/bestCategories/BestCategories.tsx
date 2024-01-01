import "./BestCategories.css";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Category from "../category/Category";
import { CategoryInterface } from "../../types/Types";

const BestCategories = () => {
  // change to bestCategories api
  const { data } = useQuery<CategoryInterface[]>({
    queryKey: ["bestCategory"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/category/list`)
        .then((res) => res.data),
  });

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <div className="best-category-title-container">
        <section>
          <h1 className="best-category-shop-by-category">Shop by Category</h1>
          <span>
            Just click on your desired category or click <b>Show More</b> to
            start your shopping.
          </span>
        </section>
        <section className="show-more-container">
          <Link to="/categories">
            <button className="showmore-btn">Show More</button>
          </Link>
        </section>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: "30px",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
          maxWidth: "1240px",
        }}
      >
        {data?.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default BestCategories;
