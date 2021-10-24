import React, { useContext, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import {
  Box,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  Divider,
} from "@material-ui/core";
// import Pagination from "@material-ui/lab/Pagination";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { useTranslation } from "react-i18next";
import DefaultLayout from "../../layouts/DefaultLayout";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ProductCard from "../../components/ProductCard/ProductCard";
import { SearchContext } from "../../contexts/SearchContext";
import { Helmet } from "react-helmet";
import { getMetaDescription, getMetaTitle } from '../../contexts/searchHelper';
import SearchStyles from './SearchStyles';
import { normalizePrices } from "../../util/default-prices";
import { SearchBarContext } from "../../contexts/SearchBarContext";


export default function SearchProduct(props) {
  const classes = SearchStyles();
  const [t] = useTranslation();

  const {
    filterData,
    products,
    loading: productsLoading,
    getURL,
    fetchFilterData,
  } = useContext(SearchContext);

  const {filterActive, setFilterActive, setShowFilter} = useContext(SearchBarContext);


  const nextPageURL = getURL({type: "NEXT_PAGE"});
  const prevPageURL = getURL({type: "PREV_PAGE"});

  const metaFilterState = {
    tags: filterData.tags.filter(x => x.selected).map(x => x.url),
    brands: filterData.brands.filter(x => x.selected).map(x => x.url),
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [products])

  useEffect(() => {
    setShowFilter(true);
    return () => setShowFilter(false);
  }, [setShowFilter]);

  const closeFilterDialog = () => setFilterActive(false);

  const renderMobileFilterPanel = (
    <Dialog
      open={filterActive}
      scroll="body"
      onClose={closeFilterDialog}
    >
      <DialogTitle style={{ backgroundColor: "white" }}>
        <Typography className={classes.title}>{t("Filters")}</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={closeFilterDialog}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider variant="middle"></Divider>

      <FilterPanel
        style={{ boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)", width: "280px" }}
      ></FilterPanel>
    </Dialog>
  );

  return (
    <DefaultLayout>
        <Helmet>
          <title>{getMetaTitle(metaFilterState, t)}</title>
          <meta name="description" content={getMetaDescription(metaFilterState, t)}></meta>
        </Helmet>
      <Box display="flex">
        {filterActive ? (
          renderMobileFilterPanel
        ) : (
          <div className={classes.hidesm}>
            <Typography className={classes.title} style={{ marginBottom: 20 }}>
              {t("Filters")}
            </Typography>
            <FilterPanel />
          </div>
        )}

        <Box className={classes.container}>
          {productsLoading && (
            <CircularProgress size="60px" style={{ marginTop: 300 }} />
          )}

          <Box display={productsLoading ? "none" : "block"}>
            <Typography className={classes.title}>
              {products?.length > 0 ? products?.length : 0}
              {"  "} {t("results found")}
            </Typography>
            <Box className={classes.result}>
              {products?.length > 0 &&
                products?.map((product) => (
                  <ProductCard key={product.id} {...normalizePrices(product)}></ProductCard>
                ))}
            </Box>

            {products?.length > 0 &&
              <>
                {filterData.page !== 1
                ? <Link className={classes.loadBtn} component={RouterLink} to={prevPageURL} onClick={fetchFilterData}>{`<< ${t('Previous Page')}`}</Link>
                : <div className={classes.btnDisabled}>{`<< ${t('Previous Page')}`}</div>}
                {products?.length < filterData.pageSize
                ? <div className={classes.btnDisabled}>{`${t('Next Page')} >>`}</div>
                : <Link className={classes.loadBtn} component={RouterLink} to={nextPageURL} onClick={fetchFilterData}>{`${t('Next Page')} >>`}</Link>}
              </>
            }
          </Box>
        </Box>
      </Box>
    </DefaultLayout>
  );
}

SearchProduct.propTypes = {};
