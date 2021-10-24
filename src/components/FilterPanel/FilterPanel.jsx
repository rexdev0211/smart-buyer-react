import React, { useContext, useState, useRef } from "react";
import {
  // withStyles,
  Card,
  CardContent,
  Typography,
  Slider,
  Divider,
  Button,
  withStyles,
  // Slider,
} from "@material-ui/core";
import { NavLink, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { SearchContext } from "../../contexts/SearchContext";
import SbCheckBox from "../SbCheckBox";
import { useTranslation } from "react-i18next";
import FilterPanelStyles from './FilterPanelStyles';

const SbSlider = withStyles({
  root: {
    color: "#e5e5e5",
  },
  track: {
    backgroundColor: "#ffe403",
  },
  thumb: {
    backgroundColor: "#ffe403",
  },
  valueLabel: {
    // left: 'calc(-50% + 12px)',
    fontFamily: "Nunito-ExtraLight",
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  markLabel: {
    fontFamily: "Nunito-ExtraLight"
  }
})(Slider);

// const priceRange = [
//   {
//     value: 950,
//     label: "$950",
//   },
//   {
//     value: 1119,
//     label: "$1119",
//   },
//   {
//     value: 1430,
//     label: "$1430",
//   },
// ];

// const PrettoSlider = withStyles({
//   root: {
//     color: "#FFE403",
//     height: 8,
//     width: "80%",
//   },
//   thumb: {
//     height: 15,
//     width: 15,
//     backgroundColor: "#FFE403",
//     // border: "2px solid currentColor",
//     marginTop: -5,
//     marginLeft: -6,
//     "&:focus, &:hover, &$active": {
//       boxShadow: "inherit",
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: "calc(-50% + 4px)",
//   },
//   track: {
//     height: 4,
//     borderRadius: 4,
//   },
//   rail: {
//     height: 4,
//     borderRadius: 4,
//     color: "#EDEDED",
//   },
//   mark: {
//     display: "none",
//   },
//   markLabel: {
//     top: -14,
//     fontFamily: "Nunito-Regular",
//     fontSize: 14,
//   },
//   marked: {
//     marginBottom: "unset",
//     marginTop: 20,
//   },
// })(Slider);

function debounce(wait, callback, immediate = false) {
  let timeout = null;
  
  return function _debounce(...args) {
    const callNow = immediate && !timeout;
    const next = () => callback.apply(this, args);
    
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);

    if (callNow) {
      next();
    }
  }
}

export default function FilterPanel(props) {
  const [t] = useTranslation();
  const classes = FilterPanelStyles();
  const history = useHistory();

  const {filterData, getURL, fetchFilterData, setFilterData} = useContext(SearchContext);

  const [price, setPrice] = useState([
    filterData.price.priceLow,
    filterData.price.priceHigh,
  ]);

  const debouncePriceUpdate = useRef(debounce(200, (data, value) => {
    const newUrl = getURL({type: "UPDATE_PRICE", value}, data);
    history.replace(newUrl);
    setFilterData(x => ({...x, price: {priceLow: value[0], priceHigh: value[1]}}));
  }));

  const {tags, brands} = filterData;

  function onUpdatePrice(ev, x) {
    setPrice(x);
    debouncePriceUpdate.current(filterData, x);
  }

  function clearAll() {
    fetchFilterData();
    setPrice([0, 5000]);
  }

  const selectedBrandsQty = brands?.filter(brand => brand.selected).length || 0;

  const selectedTagsQty = tags?.filter(tag => tag.selected).length || 0;

  return (
    <React.Fragment>
      <Helmet>
        {
          selectedBrandsQty >= 2 || selectedTagsQty >= 3 || (selectedBrandsQty >= 1 && selectedTagsQty >= 2) || filterData.page > 2 ?
          <meta name="robots" content="noindex, follow" /> 
          :
          false
        }
      </Helmet>
      <Card className={classes.panel} style={props.style}>
        <CardContent>

          <Typography className={classes.contentTitle} style={{marginBottom: 20}}>Price</Typography>

          <SbSlider
            style={{width: "90%"}}
            value={price}
            onChange={onUpdatePrice}
            valueLabelDisplay="auto"
            aria-labelledby="Price"
            getAriaValueText={x => "$" + x}
            step={100}
            min={0}
            max={5000}
            marks={[
              {value: 0, label: "$0"},
              {value: 5000, label: "$5000"},
            ]}
          />

          <hr />

          <Typography className={classes.contentTitle}>{t("Category")}</Typography>
          {tags?.map((tag) => (
            <NavLink
              className={classes.category}
              key={tag.id}
              to={getURL({type: "TOGGLE_TAG", value: tag.url})}
              onClick={fetchFilterData}
            >
              <SbCheckBox
                title={tag.name}
                value={tag.url}
                checked={filterData.tags.find(x => x.url === tag.url)?.selected ?? false}
              />
              <Typography className={classes.categoryLabel}>
                {tag.qty}
              </Typography>
            </NavLink>
          ))}
        </CardContent>
        <Divider variant="middle"></Divider>
        <CardContent>
          <Typography className={classes.contentTitle}>{t("Brand")}</Typography>
          {brands?.map((brand) => (
            <NavLink
              className={classes.category}
              key={brand.id}
              to={getURL({type: "TOGGLE_BRAND", value: brand.url})}
              onClick={fetchFilterData}
            >
              <SbCheckBox
                title={brand.nicename}
                value={brand.url}
                checked={filterData.brands.find(x => x.url === brand.url)?.selected ?? false}
              />
              <Typography className={classes.categoryLabel}>
                {brand.qty}
              </Typography>
            </NavLink>
          ))}
        </CardContent>
      </Card>
      <NavLink style={{textDecoration: "none"}} to="/search" onClick={clearAll}>
        <Button className={classes.filterBtn}>
          {t("Clear All Filters")}
        </Button>
      </NavLink>
    </React.Fragment>
  );
}

FilterPanel.propTypes = {};

FilterPanel.defaultProps = {
  brands: [],
  tags: [],
  style: {},
};
