import Head from "next/head";
import React from "react";
import { Navbar, Footer } from ".";

const Layout = ({ children }) => {
  return (
    <>
      <div className="layout">
        <head>
          <title>E-Commerce</title>
          <link rel="shortcut icon" href="../public/favicon.ico" />
        </head>
        <header>
          <Navbar />
        </header>
        <main className="main-app">{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
