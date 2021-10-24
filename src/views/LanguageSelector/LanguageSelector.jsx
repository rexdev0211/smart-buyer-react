import React, { useContext, useState } from "react";
import {
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import { useQuery } from "micro-graphql-react";
import { useHistory } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import FETCH_LANGUAGES from "../../data/queries/fetchLanguages";
import DefaultLayout from "../../layouts/DefaultLayout";
import { AppContext } from "../../contexts/AppContext";
import "./LanguageSelector.scss";
import { changeLanguage } from '../../@utils/languageHelper';

const useStyles = makeStyles(() => ({
  primaryBtn: {
    backgroundColor: yellow[500],
    "&:hover": {
      backgroundColor: yellow[700],
    },
    fontFamily: "Nunito-SemiBold",
    fontSize: 16,
    textTransform: "none",
    borderRadius: 10,
    padding: "10px 30px",
  },
  outlinedBtn: {
    "&:hover": {
      backgroundColor: yellow[500],
    },
    fontFamily: "Nunito-SemiBold",
    fontSize: 16,
    textTransform: "none",
    borderRadius: 10,
    padding: "10px 30px",
    border: "1px solid #D1D1D1",
  },
}));

export default function LanguageSelector() {
  const classes = useStyles();
  const history = useHistory();
  const { language } = useContext(AppContext);
  const { t } = useTranslation();

  const [selectedLang, setSelectedLang] = useState(language);

  const { data, loading } = useQuery(FETCH_LANGUAGES);

  const onSelectLanguage = (e) => {
    setSelectedLang(e.target.value);
  };

  const cancelChanges = () => {
    history.goBack();
  };

  const saveChanges = () => {
    changeLanguage(selectedLang);
  };

  return (
    <DefaultLayout>
      <div className="container">
        <div className="selector">
          <p className="title">{t("Language selector")}</p>
          <p className="description">
            <Trans i18nKey="languages.selector.description">
              Select the language you prefer for browsing, shopping, and
              communications
            </Trans>
          </p>

          <Divider style={{ width: "50%", margin: "20px 0" }} />

          <div>
            {loading && (
              <CircularProgress size="60px" style={{ marginLeft: 50 }} />
            )}

            <RadioGroup
              value={selectedLang}
              onChange={(e) => onSelectLanguage(e)}
            >
              {data?.languages.map((el, i) => (
                <FormControlLabel
                  key={i}
                  value={el.lang}
                  control={<Radio />}
                  label={el.label}
                ></FormControlLabel>
              ))}
            </RadioGroup>

            <Divider style={{ margin: "20px 0" }} />

            <div style={{ display: "flex" }}>
              <Button className={classes.outlinedBtn} onClick={cancelChanges}>
                {t("Cancel")}
              </Button>
              <Button
                className={classes.primaryBtn}
                style={{ marginLeft: 40 }}
                onClick={saveChanges}
              >
                {t("Save Changes")}
              </Button>
            </div>
          </div>
        </div>
        <div className="translation">
          <p className="title">{t("Translation")}</p>
          <p className="description">
            <Trans i18nKey="languages.translation.description">
              We'll translate the most important information for your browsing,
              shopping, and communications. Our translations are provided for
              your convenience. The English version of Smartbuyer.com, including
              our Conditions of Use, is the definitive version.
            </Trans>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}
