import * as React from "react";
import * as GA from "../../tracker";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

import "./ReferralCard.scss";

const useStyles = makeStyles(() => ({
  root: {},
  details: {
    display: "flex",
    // flexDirection: "column",
    textAlign: "left",
  },
}));

export default function StoreCard({ refProduct, miniMode }) {
  const classes = useStyles();

  function trackPartnerName() {
    GA.event({
      category: "Click",
      action: "partner",
      label: refProduct.partner.name,
    });
  }

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a 
      href={refProduct.url.en}
      target="_blank"
      rel="noopener nofollow"
      style={{ textDecoration: "none" }}
      onClick={trackPartnerName}
    >
      <Card className="store-card" raised>
        <CardMedia
          className="store-thumb"
          image={refProduct.image?.thumb}
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent>
            <Typography className="store-title">{refProduct.title.en.match(/.{1,75}/)}</Typography>

              <Typography className="store-price">
                {refProduct.currentPrice?.priceLow}$ - {refProduct.currentPrice?.priceHigh}$
              </Typography>
              <Typography className="store-rating">Rating: {refProduct.data.rating}</Typography>
          </CardContent>
        </div>
      </Card>
    </a>
  );
}
