import React from "react";
import Product from "./Product";

const Products = ({ products }) => {
  return (
    <div className="products">
      <div className="main-title">
        <h2>Best Seller Products</h2>
      </div>
      <div className="container">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
