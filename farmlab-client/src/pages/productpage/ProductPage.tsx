import "./ProductPage.css";
import { CategoryInterface, ProductInterface } from "../../types/Types";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ProductCard from "../../components/productCard/ProductCard";
import SearchComponent from "../../components/search/Search";
import { useLocation } from "react-router-dom";

const ProductPage = () => {
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get("category");

  // Update the initial state of selectedCategoryId based on the value of categoryId
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    categoryId === null ? "" : categoryId
  );

  const { data, isLoading } = useQuery<ProductInterface[]>({
    // Modify the query key to use selectedCategoryId instead of categoryId
    queryKey: ["productList", selectedCategoryId],
    // Update the query function to use selectedCategoryId instead of categoryId
    queryFn: async ({ queryKey }) => {
      const [_, selectedCategoryId] = queryKey;
      const url = selectedCategoryId
        ? `${
            import.meta.env.VITE_APP_API_URL
          }/api/product/list?category=${selectedCategoryId}`
        : `${import.meta.env.VITE_APP_API_URL}/api/product/list`;
      const res = await axios.get(url);
      return res.data;
    },
  });

  const [filteredCategoriesProducts, setFilteredProducts] = useState<
    ProductInterface[]
  >([]);

  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/category/list`
      );
      setCategories(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Update the useEffect that sets filteredCategoriesProducts to be based on selectedCategoryId when data changes
    if (data) {
      setFilteredProducts(data);
    }
  }, [data, categoryId]);

  const handleSearch = (searchTerm: string) => {
    if (data) {
      const filtered = data.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="product-page">
      <SearchComponent handleSearch={handleSearch} />
      <div className="select-container">
        <label className="select-label">Select Category:</label>
        <select
          className="select-element"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories?.map((item, key) => (
            <option value={item.id} key={key}>
              {item.categoryName}
            </option>
          ))}
        </select>
      </div>
      <div className="productpage-container">
        {isLoading ? (
          "Loading..."
        ) : filteredCategoriesProducts.length === 0 ? (
          "No products found for this category."
        ) : (
          <div className="filtered-category-products">
            {filteredCategoriesProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
