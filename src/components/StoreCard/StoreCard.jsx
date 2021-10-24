import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import "./StoreCard.scss";

const useStyles = makeStyles(() => ({
  root: {},
  details: {
    display: "flex",
    // flexDirection: "column",
    textAlign: "left",
  },
}));

const dummyStore = {
  title: "-----------",
  location: "-----",
  ratings: 8.5,
  color: "----",
  diagonal: "-",
  size: "--",
  price1: 650,
  price2: 1000,
};

export default function StoreCard({ refProduct, miniMode }) {
  const classes = useStyles();

  const parseColor = (data) => {
    return data.color?.[0] ? data.color?.[0] : "--";
  };

  return (
    <a href={refProduct.url.en} style={{ textDecoration: "none" }}>
      <Card className="store-card" raised>
        <CardMedia
          className="store-thumb"
          image={refProduct.image?.thumb}
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent>
            <Typography className="store-title">{dummyStore.title}</Typography>
            <Typography className="store-location flex-center">
              <LocationOnOutlinedIcon
                fontSize="small"
                style={{ marginLeft: "-5px" }}
              ></LocationOnOutlinedIcon>
              {dummyStore.location}
            </Typography>

            <div className="flex-center">
              <Typography className="store-property">
                Color: {parseColor(refProduct.data)}
              </Typography>
              <Typography className="store-property">
                Diagonal: {dummyStore.diagonal}
              </Typography>
              <Typography className="store-property">
                Size: {dummyStore.size}
              </Typography>
            </div>

            {miniMode !== true ? (
              <Typography className="store-price">
                {refProduct.currentPrice?.priceLow}$ -
                {refProduct.currentPrice?.priceHigh}$
              </Typography>
            ) : (
              <div
                className="flex-center"
                style={{ justifyContent: "space-between" }}
              >
                <Typography className="store-price">
                  {refProduct.currentPrice?.priceLow}$ -
                  {refProduct.currentPrice?.priceHigh}$
                </Typography>
                <div className="flex-center" style={{ alignItems: "unset" }}>
                  <Typography className="store-rating">10</Typography>
                  <Rating
                    name="hover-feedback"
                    value={8.5}
                    precision={0.5}
                    readOnly
                    style={{ fontSize: "0.75rem" }}
                  />
                </div>
              </div>
            )}
          </CardContent>

          {miniMode !== true && (
            <CardContent>
              <div className="flex-center">
                <Rating
                  name="hover-feedback"
                  value={8.5}
                  precision={0.5}
                  readOnly
                />
                <Typography className="store-rating">10</Typography>
              </div>
            </CardContent>
          )}
        </div>
      </Card>
    </a>
  );
}
