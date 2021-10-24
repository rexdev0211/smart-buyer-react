import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getDefaultClient } from "micro-graphql-react";
import FETCH_FILTER_DATA from "../data/queries/fetchFilterData";
import FETCH_PRODUCTS from "../data/queries/fetchProducts";
import {AppContext} from "./AppContext";


export const SearchContext = createContext();

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PRICE_LOW = 0;
const DEFAULT_PRICE_HIGH = 5000;

function getFiltersFromURL() {
  const path = window.location.pathname + "/";

  const brandRegex = /\/brand\/([^/]+?)\//;
  const tagRegex = /\/tag\/([^/]+?)\//;
  const priceRegex = /\/price\/(\d+?)-(\d+?)\//;
  const searchRegex = /\/search\/([^/]+)\//;
  const pageRegex = /\/page\/(\d+?)\//;
  const pageSizeRegex = /\/pageSize\/(\d+?)\//;

  const brandsMatch = path.match(brandRegex);
  const brands = brandsMatch
    ? brandsMatch[1].split(",")
    : [];

  const tagsMatch = path.match(tagRegex);
  const tags = tagsMatch
    ? tagsMatch[1].split(",")
    : [];

  const priceMatch = path.match(priceRegex);
  const price = priceMatch
    ? {priceLow: Number(priceMatch[1]), priceHigh: Number(priceMatch[2])}
    : {priceLow: DEFAULT_PRICE_LOW, priceHigh: DEFAULT_PRICE_HIGH};


  const pageMatch = path.match(pageRegex);
  const page = pageMatch
    ? Number(pageMatch[1])
    : DEFAULT_PAGE;

  const pageSizeMatch = path.match(pageSizeRegex);
  const pageSize = pageSizeMatch
    ? Number(pageSizeMatch[1])
    : DEFAULT_PAGE_SIZE;


  const searchMatch = path.match(searchRegex);
  const search = searchMatch
    ? decodeURIComponent(searchMatch[1])
    : null;


  const state = {brands, tags, price, page, pageSize, search};
  return state;
}

export function SearchContextProvider({children, render}) {
  const { language } = useContext(AppContext);

  const [filterData, setFilterData] = useState({
    ...getFiltersFromURL(),
    brands: [],
    tags: [],
    page: 1,
    pageSize: 10,
  });
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPriceDefault, setIsPriceDefault] = useState(true);

  const fetchFilterData = useCallback(() => {
    Promise.resolve().then(() => {
      const state = getFiltersFromURL();
      const {price, search, page, pageSize} = state;

      const variables = {lang: language};
      if (state.tags.length) {
        variables.filterTag = {tagUrls: state.tags};
      }
      if (state.brands.length) {
        variables.filterBrand = {brandUrls: state.brands};
      }
      if (price && price.priceLow !== null && price.priceHigh !== null && (price.priceLow !== DEFAULT_PRICE_LOW || price.priceHigh !== DEFAULT_PRICE_HIGH)) {
        variables.filterPrice = {priceFrom: price.priceLow, priceTo: price.priceHigh};
      }

      getDefaultClient().runQuery(FETCH_FILTER_DATA, variables)
        .then(x => {
          const {tags, brands} = x?.data?.filterData ?? {};
          let newFilterData = {price, search, tags, brands, page, pageSize};
          filterData.priceLow !== newFilterData.priceLow || filterData.priceHigh !== newFilterData.priceHigh
            ?
            setIsPriceDefault(true)
            :
            setIsPriceDefault(false)

          setFilterData(newFilterData);
        });
    });
  }, [language]);

  function getURL(action = {type: "NOOP"}, data = filterData) {
    if (action.type === "CLEAR_ALL") {
      return "/search/";
    }

    if (action.type === "UPDATE_SEARCH") {
      return "/search/" + encodeURIComponent(action.value);
    }

    const brands = data.brands
      .filter(x => action.type === "TOGGLE_BRAND" && x.url === action.value ? !x.selected : x.selected)
      .map(x => x.url);
    const tags = data.tags
      .filter(x => action.type === "TOGGLE_TAG" && x.url === action.value ? !x.selected : x.selected)
      .map(x => x.url);

    const parts = [];
    if (brands.length) {
      parts.push("brand", brands.sort().join(","));
    }
    if (tags.length) {
      parts.push("tag", tags.sort().join(","));
    }

    const { price } = data;
    const isDefaultPrice = (low, high) => low === DEFAULT_PRICE_LOW && high === DEFAULT_PRICE_HIGH;

    if (action.type === "UPDATE_PRICE") {
      if (!isDefaultPrice(action.value[0], action.value[1])) {
        parts.push("price", `${action.value[0]}-${action.value[1]}`);
      }
    } else if (price && price.priceLow !== null && price.priceHigh !== null && !isDefaultPrice(price.priceLow, price.priceHigh)) {
      parts.push("price", `${price.priceLow}-${price.priceHigh}`);
    }

    const pageValue = data.page + Number(action.type === "NEXT_PAGE") - Number(action.type === "PREV_PAGE");
    if (pageValue !== DEFAULT_PAGE && action.type !== "TOGGLE_BRAND" && action.type !== "TOGGLE_TAG") {
      parts.push("page", String(pageValue));
    }
    if (data.pageSize !== DEFAULT_PAGE_SIZE) {
      parts.push("pageSize", String(data.pageSize));
    }

    if (action.type === "UPDATE_SEARCH") {
      parts.push("search", encodeURIComponent(action.value));
    } else if (filterData.search !== null) {
      parts.push("search", filterData.search);
    }

    if (!parts.length) {
      parts.push('search');
    }
    return `/${parts.join("/")}`;
  }

  const fetchProducts = useCallback(() => {
    const variables = {
      lang: language,
      page: filterData.page,
      pageSize: filterData.pageSize,
      filterImages: {sizes: ["small"], pos: 1},
    };

    const tagUrls = filterData.tags.filter(x => x.selected).map(x => x.url);
    const brandUrls = filterData.brands.filter(x => x.selected).map(x => x.url);

    if (tagUrls.length) {
      variables.filterTag = {tagUrls};
    }
    if (brandUrls.length) {
      variables.filterBrand = {brandUrls};
    }

    if (filterData.price && (filterData.price.priceLow !== DEFAULT_PRICE_LOW || filterData.price.priceHigh !== DEFAULT_PRICE_HIGH)) {
      variables.filterPrice = {priceFrom: filterData.price.priceLow, priceTo: filterData.price.priceHigh};
    }
    if (filterData.search !== null) {
      variables.filterText = filterData.search;
    }

    setLoading(true);
    const results = getDefaultClient().runQuery(FETCH_PRODUCTS, variables);

    results.then(x => {
      setProductsData(x?.data?.products ?? []);
      setLoading(false);
    });
  }, [filterData.brands, filterData.page, filterData.pageSize, filterData.price, filterData.tags, filterData.search, language]);

  useEffect(() => {
    render && fetchFilterData();
  }, [fetchFilterData]);

  useEffect(() => {
    render && !isPriceDefault && fetchProducts();
  }, [fetchProducts]);

  const context = {
    filterData,
    products: productsData,
    loading,
    setFilterData,
    fetchFilterData,
    fetchProducts,
    getURL,
  };

  return <SearchContext.Provider value={context}>
    {children}
  </SearchContext.Provider>;
}