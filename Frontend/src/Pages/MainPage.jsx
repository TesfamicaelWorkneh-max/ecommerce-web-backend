import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "./Home";
import Categories from "./Categories.jsx";
import ProductsPage from "./ProductsPage";
import AboutPage from "./AboutPage.jsx";
import ShippingInfoPage from "./ShippingInfoPage.jsx";
import ReturnPolicyPage from "./ReturnPolicyPage.jsx";
import FAQPage from "./FAQpage.jsx";
import ContactPage from "./Contact.jsx";
import Footer from "./Footer";

const MainPage = () => {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash in the URL, scroll to that section
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      // Scroll to top if no hash
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="w-full min-h-screen">
      {/* Home Section */}
      <section id="home" className="min-h-screen">
        <Home />
      </section>

      {/* Categories Section */}
      <section id="categories" className="min-h-screen">
        <Categories />
      </section>

      {/* Products Section */}
      <section id="products" className="min-h-screen">
        <ProductsPage />
      </section>

      {/* About Section */}
      <section id="about" className="">
        <AboutPage />
      </section>

      {/* Shipping Info Section */}
      <section id="shipping" className="">
        <ShippingInfoPage />
      </section>

      {/* Return Policy Section */}
      <section id="policy" className="">
        <ReturnPolicyPage />
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="">
        <FAQPage />
      </section>

      {/* Contact Section */}
      <section id="contact" className="">
        <ContactPage />
      </section>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default MainPage;
