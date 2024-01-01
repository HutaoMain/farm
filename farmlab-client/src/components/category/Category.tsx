import "./Category.css";
import { CategoryInterface } from "../../types/Types";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  category: CategoryInterface;
}

const Category: React.FC<Props> = ({ category }) => {
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(`/products?category=${category.id}`);
  };

  return (
    <div className="category" onClick={handleClickNavigate}>
      <div className="categories">
        <div className="category-container">
          <img
            className="category-image"
            src={category?.imageUrl}
            alt={category?.categoryName}
          />
          <div className="category-name">{category?.categoryName}</div>
        </div>
      </div>
    </div>
  );
};

export default Category;
