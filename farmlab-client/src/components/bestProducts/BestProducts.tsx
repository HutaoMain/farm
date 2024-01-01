import ProductCard from "../productCard/ProductCard";
import { useQuery } from "react-query";
import { ProductInterface } from "../../types/Types";
import axios from "axios";

const BestProducts = () => {
  const { data } = useQuery<ProductInterface[]>({
    queryKey: ["bestProducts"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/product/bestProducts`)
        .then((res) => res.data),
  });

  return (
    <div
      id="best-products"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: "50px",
      }}
    >
      <h1 style={{ textAlign: "start", marginBottom: "50px" }}>
        Best Selling Farm Products
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: "20px",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
          maxWidth: "1240px",
        }}
      >
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestProducts;
