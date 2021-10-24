import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import { useQuery } from "micro-graphql-react"
import { Carousel } from "react-responsive-carousel";
import FETCH_BRANDS from "../../data/queries/fetchTopBrands";
import FETCH_TAGS from "../../data/queries/fetchTopTags";
import { AppContext } from "../../contexts/AppContext";
import ExpandableTitle from "../../components/ExpandableTitle/ExpandableTitle";
import DefaultLayout from "../../layouts/DefaultLayout";
import ProductCard from "../../components/ProductCard/ProductCard";
import BrandCard from "../../components/BrandCard/BrandCard";
import SbTabs from "../../components/SbTabs";
import FETCH_POPULAR_PRODUCT from "../../data/queries/fetchTopProducts";
import "../../styles/main.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { normalizePrices } from "../../util/default-prices";
import "./Home.scss";

export default function Home() {
  const { language } = useContext(AppContext);
  const [topBrands, setTopBrands] = useState([]);
  const [topTags, setTopTags] = useState([]);
  const [productsData, setProductsData] = useState({});

  const queryBrands = useQuery(FETCH_BRANDS, {
    lang: language,
    page: 1,
    pageSize: 10,
  });

  const queryTags = useQuery(FETCH_TAGS, {
    lang: language,
    page: 1,
    pageSize: 10,
  });

  const [top3Tags, setTop3Tags] = useState([]);


  const { t } = useTranslation();

  const variables = {
    lang: language,
    page: 1,
    pageSize: 5,
    filterImages: {
      sizes: ['small'],
      pos: 1,
    },
  };

  const queryPopular = useQuery(FETCH_POPULAR_PRODUCT, {
    ...variables,
    filterTag1: { tagUrls: top3Tags?.[0]?.url },
    page1: 1,
    filterTag2: { tagUrls: top3Tags?.[1]?.url },
    page2: 2,
    filterTag3: { tagUrls: top3Tags?.[2]?.url },
    page3: 3,
  }, {active: top3Tags.length});

  useEffect(() => {
    if (queryBrands.data) {
      setTopBrands(queryBrands.data.topBrands);
    }
  }, [queryBrands.data]);

  useEffect(() => {
    if (queryTags.data) {
      setTopTags(queryTags.data.topTags);
      setTop3Tags(queryTags.data.topTags.slice(0, 3));
    }
  }, [queryTags.data]);

  useEffect(() => {
    if (queryPopular.data) {
      setProductsData(queryPopular.data);
    }
  }, [queryPopular.data]);

  return (
    <DefaultLayout>
        <Helmet>
          <title>Smartbuyer - {t('homeMetaTitle')}</title>
          <meta name="description" content={t('homeMetaDescription') + ' - Smartbuyer'}></meta>
        </Helmet>
      <Box mt={3} mb={3} className="carousel__box">
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          showStatus={false}
        >
          <div>
            <Link to="/products/Xiaomi/Mi%2011" className="banner-link" >
              <img
                alt="Xiaomi Mi 11"
                src="https://p-static-dev.smartbuyer.me/home-banners/Mi-11-banner.webp"
                srcSet="https://p-static-dev.smartbuyer.me/home-banners/Mi-11-banner.mobile.webp 800w, https://p-static-dev.smartbuyer.me/home-banners/Mi-11-banner.webp 1232w"
                sizes="calc(100vw-40px)"
              />
            </Link>
          </div>

          <div>
            <Link to="/products/Oppo/A15" className="banner-link" >
              <img
                alt="Oppo A15"
                src="https://p-static-dev.smartbuyer.me/home-banners/Oppo-a15.webp"
                srcSet="https://p-static-dev.smartbuyer.me/home-banners/Oppo-a15.mobile.webp 800w, https://p-static-dev.smartbuyer.me/home-banners/Oppo-a15.webp 1232w"
                sizes="calc(100vw-40px)"
              />
            </Link>
          </div>

        </Carousel>
      </Box>

      <Box className="top-tags">
        {<SbTabs tabs={topTags}></SbTabs>}
      </Box>

      {/* Brands */}
      <ExpandableTitle title={t("Brand", {count: 100})} link="/search"></ExpandableTitle>
      <Box className="brands-list">
        {topBrands?.map((brand) => (
          <BrandCard key={brand.id} {...brand}></BrandCard>
        ))}
      </Box>

      {/* Popular products */}
      <ExpandableTitle
        title={top3Tags?.[0]?.name}
        link={`/tag/${top3Tags?.[0]?.url}`}
      ></ExpandableTitle>
      <Box className="products-list">
        {productsData?.top1?.length > 0 &&
          productsData.top1.map((product) => (
            <ProductCard key={product.id} {...normalizePrices(product)}></ProductCard>
          ))}
      </Box>

      <ExpandableTitle
        title={top3Tags?.[1]?.name}
        link={`/tag/${top3Tags?.[1]?.url}`}
      ></ExpandableTitle>
      <Box className="products-list">
        {productsData?.top2?.length > 0 &&
          productsData.top2.map((product) => (
            <ProductCard key={product.id} {...normalizePrices(product)}></ProductCard>
          ))}
      </Box>

      <ExpandableTitle
        title={top3Tags?.[2]?.name}
        link={`/tag/${top3Tags?.[2]?.url}`}
      ></ExpandableTitle>
      <Box className="products-list">
        {productsData?.top3?.length > 0 &&
          productsData.top3.map((product) => (
            <ProductCard key={product.id} {...normalizePrices(product)}></ProductCard>
          ))}
      </Box>
    </DefaultLayout>

  );
}
