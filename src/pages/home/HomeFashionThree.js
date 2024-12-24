import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIconSeven";
import HeroSliderSixteen from "../../wrappers/hero-slider/HeroSliderSixteen";
import TabProductFour from "../../wrappers/product/TabProduct";
import CategoryFiveGrid from "../../wrappers/category/CategoryFiveGrid";
import SectionTitle from "../../components/section-title/SectionTitleWithText";
import BannerEighteen from "../../wrappers/banner/BannerFourteen";
import TestimonialOne from "../../wrappers/testimonial/TestimonialOne";
import NewsletterTwo from "../../wrappers/newsletter/NewsletterTwo";

const HomeFashionThree = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Homepage"
        description="No. 1 Fruits and Vegetable Market "
      />

      <LayoutOne
        headerContainerClass="container"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        <HeroSliderSixteen />

        <SectionTitle
          titleText="Ahuja Mart  Fruit of the week "
          positionClass="text-center"
          spaceTopClass="pt-100"
        />

        <TabProductFour
          category="Fruits"
          productTabClass="product-tab-fruits"
        />
        <TabProductFour
          category="Vegetables"
          productTabClass="product-tab-fruits"
        />
        <TabProductFour
          category="vegetables"
          productTabClass="product-tab-fruits"
        />

        <TabProductFour category="dairy" productTabClass="product-tab-fruits" />

        <CategoryFiveGrid />

        <FeatureIconTwo spaceTopClass="mt-60" spaceBottomClass="pb-20" />

        {/* banner Section  */}
        <BannerEighteen />

        {/* testimonial */}
        <TestimonialOne
          spaceTopClass="pt-100"
          spaceBottomClass="pb-95"
          spaceLeftClass="ml-70"
          spaceRightClass="mr-70"
          bgColorClass="bg-gray-3"
        />

        {/* testimonial */}

        {/* newsletter */}
        <NewsletterTwo
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          subscribeBtnClass="green-subscribe"
        />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashionThree;
