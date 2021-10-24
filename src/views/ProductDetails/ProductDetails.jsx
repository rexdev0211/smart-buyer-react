import React, { useState, useContext, lazy } from "react";
import {
  Paper,
  Divider,
  Box,
  CircularProgress,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { useQuery } from "micro-graphql-react";
import ReferralCard from "../../components/ReferralCard/ReferralCard";
import DefaultLayout from "../../layouts/DefaultLayout";
import SbButtonGroup from "../../components/SbButtonGroup/SbButtonGroup";
import ExpandableTitle from "../../components/ExpandableTitle/ExpandableTitle";
import ProductCard from "../../components/ProductCard/ProductCard";
import SbBreadCrumbs from "../../components/SbBreadCrumbs/SbBreadCrumbs";
import { ViewportProviderContext } from "../../contexts/ViewportProvider";
import FETCH_PRODUCT from "../../data/queries/fetchProduct";
import FETCH_PRODUCT_REF from "../../data/queries/fetchProductRef";
import FETCH_POPULAR_PRODUCT from "../../data/queries/fetchTopProducts";
import "./ProductDetails.scss";
import { AppContext } from "../../contexts/AppContext";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { refClient } from "../../graphql-clients";
import { normalizePrices } from "../../util/default-prices";
import { UserService } from '../../services/UserService';

const ProductDescription = lazy(() => import("./Description/ProductDescription"));
const ProductDescriptionM = lazy(() => import("./Description/ProductDescriptionM"));
const ProductDescriptionT = lazy(() => import("./Description/ProductDescriptionT"));


export default function ProductDetails({ match: propsMatch }) {
  // The url from react router is decoded except "+" character
  // So, we fix it here
  const productUrlDecoded = propsMatch.params.productUrl.replaceAll('%2B', '+');

  const { language } = useContext(AppContext);

  const { t } = useTranslation();
  const storeTabButtons = [
    {
      title: t("Where to buy"),
    },
  ];
  const { loading, data: product } = useQuery(FETCH_PRODUCT, {
    fullUrl: productUrlDecoded.split('/').map(encodeURIComponent).join('/'),
    lang: language,
  });

  const { data: refProducts } = useQuery(FETCH_PRODUCT_REF, {
    sbProductId: product?.product?.id,
  }, {active: product, client: refClient(UserService.isLoggedIn())});

  var variables = {
    lang: language,
    page: 1,
    pageSize: 5,
  };

  const { data: similarProducts } = useQuery(FETCH_POPULAR_PRODUCT, {
    ...variables,
    filterTag1: { tagUrls: product?.product?.tags?.[0]?.url },
    filterTag2: { tagUrls: product?.product?.tags?.[1]?.url },
    filterTag3: { tagUrls: product?.product?.tags?.[2]?.url },
    page1: 1,
  }, { active: product?.product?.tags?.[0].url });

  const { viewportSize } = useContext(ViewportProviderContext);

  const [setShowOnlineStores] = useState(0);

  const onChangeStores = function (param) {
    setShowOnlineStores(param);
  };

  const navCrumbs = [
    {
      title: t("Search"),
      link: "/search",
    },
    {
      title: product?.product?.brand.nicename,
      link: "/brand/" + product?.product?.brand.url,
    },
    {
      title: product?.product?.fullName,
      link: "/",
    },
  ];

  const renderData = (attrib) => {
    return (
      Object.keys(attrib).map((key) =>
        (key !== 'source' && key !== 'review') ? (

          (viewportSize === "mobile" ? (
            [<TableRow key={`${key}-title`} >
              <TableCell className="data-title" component="th" scope="row">{key}</TableCell>
              </TableRow>,
            <TableRow key={key}><TableCell className="data-value" dangerouslySetInnerHTML={{
              __html: attrib[key],
            }}></TableCell></TableRow>]
          ) : (
            <TableRow key={key}>
              <TableCell className="data-title" component="th" scope="row">{key}</TableCell>
              <TableCell className="data-value" dangerouslySetInnerHTML={{
                __html: attrib[key],
              }}></TableCell>
            </TableRow>

          ))
        ) : null)
    )
  };

  const getMetaDescription = () => {
    if (product?.product?.description?.description) {
      return product?.product?.description?.description.replace(/(<([^>]+)>)/gi, "").slice(0,100) // removes html tags and keeps only the first 100 characters
    }
    return t('productMetaDescription', { productTitle: productUrlDecoded.replaceAll('/', ' ') })
  }

  return (
    <DefaultLayout>
        <Helmet>
          <title>{t('productMetaTitle', { productTitle: productUrlDecoded.replaceAll('/', ' ') })}</title>
          <meta name="description" content={getMetaDescription()}></meta>
        </Helmet>
      <Box>
        <SbBreadCrumbs crumbs={navCrumbs}></SbBreadCrumbs>
      </Box>

      {loading && <CircularProgress size="60px" style={{position:'realtive', right: 25, marginTop: 300}} />}

      {/* optional meta tag */}

      <Box display={loading ? "none" : "block"} mt={3}>
        {viewportSize === "mobile" ? (
          <ProductDescriptionM product={product?.product}></ProductDescriptionM>
        ) : viewportSize === "tablet" ? (
          <ProductDescriptionT product={product?.product}></ProductDescriptionT>
        ) : (
          <ProductDescription product={product?.product}></ProductDescription>
        )}

        <Box className="mid-container">
          <Box className="stores-widget">
            <Box marginBottom={3}>
              <SbButtonGroup
                buttons={storeTabButtons}
                onChange={onChangeStores}
              ></SbButtonGroup>
            </Box>
            <Paper className="stores-wrapper" elevation={3}>
              {refProducts?.products?.map((ref, i) => (
                <ReferralCard
                  refProduct={ref}
                  miniMode={viewportSize === "mobile"}
                  key={i}
                ></ReferralCard>
              ))}
            </Paper>
          </Box>
        </Box>
        <Box marginTop={2}>
              <SbButtonGroup
                buttons={[
                  {
                    title: t("Specs"),
                  }
                ]}
              ></SbButtonGroup>
        </Box>

              <Divider />
              <TableContainer component={Paper} style={{marginTop: 15 }}>
                <Table>
                  <TableBody>
                    {product?.product?.data && renderData(product?.product?.data)}
                  </TableBody>
                </Table>
              </TableContainer>
        {/* {viewportSize === "mobile" ? (
          <ProductRatingsM></ProductRatingsM>
        ) : viewportSize === "tablet" ? (
          <ProductRatingsT></ProductRatingsT>
        ) : (
          <ProductRatings></ProductRatings>
        )} */}
        {/*  */}
        <ExpandableTitle title="Similar products" link="/"></ExpandableTitle>
        <Box className="products-list">
          {similarProducts && similarProducts.top1.map((val, i) => {

            return <ProductCard key={i} {...normalizePrices(val)}></ProductCard>
          })}
        </Box>
      </Box>
    </DefaultLayout>
  );
}
