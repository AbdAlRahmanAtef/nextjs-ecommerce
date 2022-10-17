import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const HeroBanner = ({
  heroBanner: {
    smallText,
    midText,
    largeText1,
    image,
    product,
    buttonText,
    desc,
  },
}) => {
  return (
    <div className="banner">
      <div className="container">
        <div className="info">
          <h1>{midText}</h1>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button" className="main-btn">
              {buttonText}
            </button>
          </Link>
        </div>
        <img src={urlFor(image)} alt="headphones" className="banner-image" />
      </div>
    </div>
  );
};

export default HeroBanner;
