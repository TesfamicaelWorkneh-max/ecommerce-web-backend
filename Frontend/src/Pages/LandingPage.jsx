import Home from "./Home";
import Categories from "./Categories";
import ProductsPage from "./ProductsPage";
import AboutPage from "./AboutPage";
import ShippingInfoPage from "./ShippingInfoPage";
import ReturnPolicyPage from "./ReturnPolicyPage";
import ContactPage from "./Contact";
import FAQPage from "./FAQpage";
import BlogPage from "./BlogPage";

const LandingPage = () => {
  return (
    <>
      <section id="home">
        <Home />
      </section>

      <section id="categories">
        <Categories />
      </section>

      <section id="products">
        <ProductsPage />
      </section>

      <section id="about">
        <AboutPage />
      </section>

      <section id="shipping">
        <ShippingInfoPage />
      </section>

      <section id="returns">
        <ReturnPolicyPage />
      </section>

      <section id="contact">
        <ContactPage />
      </section>

      <section id="faqs">
        <FAQPage />
      </section>

      <section id="blog">
        <BlogPage />
      </section>
    </>
  );
};

export default LandingPage;
