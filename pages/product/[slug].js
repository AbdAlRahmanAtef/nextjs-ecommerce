import React, { useContext, useState } from "react";
import { client, urlFor } from "../../lib/client";

import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import Product from "../../components/Product";
import { useCart } from "../../context/cartContext";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setindex] = useState(0);
  const { cart, addToCart } = useCart();
  return (
    <div className="product-details">
      <div className="container">
        <div className="product-details-container">
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              alt=""
              className="main-image"
            />
            <div className="small-images">
              {image.map((image, i) => (
                <img
                  key={i}
                  onMouseEnter={() => setindex(i)}
                  src={urlFor(image)}
                  alt=""
                  className={`small-image ${i === index && "active"}`}
                />
              ))}
            </div>
          </div>
          <div className="info">
            <h2>{name}</h2>
            <div className="stars">
              <AiFillStar size={22} />
              <AiFillStar size={22} />
              <AiFillStar size={22} />
              <AiFillStar size={22} />
              <AiOutlineStar size={22} />
              (20)
            </div>
            <div className="details-info">
              <h3>Details:</h3>
              <p>{details}</p>
            </div>
            <div className="price">${price}</div>
            <div className="add-to-cart">
              <button onClick={() => addToCart(product)}> Add To Cart </button>
              <button> Buy Now </button>
            </div>
          </div>
        </div>
        <div className="may-like">
          <h2>You May Like</h2>
          <div className="may-like-items">
            {products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
