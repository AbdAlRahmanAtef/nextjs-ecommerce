import React from "react";
import { Layout, HeroBanner, Products } from "../components";
import { client } from "../lib/client";

const Home = ({ products, bannerData }) => {

  return (
    <div>
      <HeroBanner heroBanner={bannerData && bannerData[0]} />
      <Products products={products} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};
export default Home;
