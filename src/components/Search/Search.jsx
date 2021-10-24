import React, { useState, useEffect, useMemo, useContext } from "react";
import * as GA from "../../tracker";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, Grid, Typography, Chip, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useTranslation } from "react-i18next";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link, useHistory } from "react-router-dom";
import { getDefaultClient } from "micro-graphql-react";
import FETCH_SEARCH_RESULTS from "../../data/queries/fetchSearchResults";
import { AppContext } from "../../contexts/AppContext";
import { SearchContext } from "../../contexts/SearchContext";
import "./Search.scss";
import { tagColor } from "../../@utils/tagColor";

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
  };
}

const useStyles = makeStyles(theme => ({
  searchNew: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginTop: "3px",
    marginBottom: "3px",
    borderRadius: "20px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

export function Search({ onOpen, onClose, mobile, active }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const classes = useStyles();
  const [t] = useTranslation();

  const { language } = useContext(AppContext);
  const { getURL, fetchFilterData } = useContext(SearchContext);
  const history = useHistory();


  const fetchSuggestions = useMemo(
    () =>
      debounce(200, (search, callback) => {
        getDefaultClient()
          .runQuery(FETCH_SEARCH_RESULTS, {
            lang: language,
            filterText: search,
          })
          .then(x => callback(x?.data?.products));
      }),
    [language],
  );

  function submitSearch(x, e) {
    if (e) {
      e.preventDefault();
    }
    const newUrl = getURL({type: "UPDATE_SEARCH", value: x});
    history.replace(newUrl);
    fetchFilterData();
  }

  useEffect(() => {
    let active = true;

    if (inputValue.length < 2) {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetchSuggestions(inputValue, results => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        GA.event({
          category: "Button",
          action: "search term",
          label: inputValue,
        });

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetchSuggestions]);

  const AutocompleteInput = (
    <Autocomplete
      className={classes.input}
      getOptionLabel={option => typeof option === "string" ? option : option.fullName}
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      openOnFocus
      freeSolo
      value={value}
      open={active}
      onOpen={() => {
        onOpen();
      }}
      onClose={() => {
        onClose();
      }}
      onChange={(event, newValue, reason) => {
        const val = typeof newValue === "object" && newValue ? newValue.fullName : newValue;
        setOptions(val ? [val, ...options] : options);
        setValue(val);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={params => (
        <div className={classes.inputWrapper} ref={params.InputProps.ref}>
          {active && mobile && <SearchIcon onClick={() => { 
            if(inputValue) {
              onClose(); 
              submitSearch(inputValue); 
              setOptions([]); 
            }}} />
          }
          <InputBase
            placeholder={!mobile || active ? t("Search") + "..." : ""}
            className={classes.input}
            inputProps={{
              "aria-label": t("Search"),
              ...params.inputProps,
              autoFocus: active,
              disabled: (mobile && !active),
              onKeyDown: e => {
                if (e.key === "Enter" && mobile && inputValue) {
                  submitSearch(inputValue);
                }
              },
            }}
          />
          {!mobile && <SearchIcon style={{ cursor: "pointer" }} onClick={() => { submitSearch(inputValue); setOptions([]) }} />}
          {(mobile && !active) && <SearchIcon onClick={onOpen} />}
        </div>
      )}
      renderOption={option => {
        const thumb = (option.images ?? []).find(x => x.size === "thumb");

        return (
          <Link
            to={`/products/${option.fullUrl}`}
            style={{ textDecoration: "none" }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                {thumb && (
                  <img
                    src={thumb.url}
                    className="search__image"
                    alt={option.fullName}
                    style={{ width: "30px", height: "auto" }}
                  />
                )}
              </Grid>

              <Grid item container direction="column" xs={12} sm>
                <Grid item>
                  <Typography
                    className="nunito-bold"
                    style={{ color: "black" }}
                  >
                    {option.fullName}
                  </Typography>
                </Grid>
                {!mobile && (
                  <Grid item>
                    {(option.tagNames ?? []).slice(0, 5).map((tag, i) => (
                      <Chip
                        key={i}
                        size="small"
                        label={tag}
                        color="primary"
                        style={{ marginRight: 10, backgroundColor: tagColor(tag), color: "white" }}
                      />
                    ))}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Link>
        );
      }}
    />
  );

  if (mobile) {
    return AutocompleteInput;
  }

  return (
    <Paper component="form" variant="outlined" className={classes.searchNew} onSubmit={e => submitSearch(value, e)}>
      {AutocompleteInput}
    </Paper>
  );
}
