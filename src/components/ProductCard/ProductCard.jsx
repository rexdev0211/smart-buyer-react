import React from "react";
import PropType from "prop-types";
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "./ProductCard.scss";

function showPrice(x) {
  return Boolean(x && typeof x === "object" && (x.low || x.high));
}


export default function ProductCard(props) {
  const url = `/products/${props.fullUrl}`

  return (
    <Link underline='none' component={RouterLink} to={url}>

    <Card className="product-card" raised>
      <CardActionArea>
        {props.images && (
          <CardMedia
            className="product-thumb"
            image={props.images.find((img) => img.size === "small")?.url}
            title={props.fullName}
          ></CardMedia>
        )}

        <CardContent>
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              marginBottom: 20,
            }}
          >
            {props.rating && (
              <Typography className="product-rating">
                {props.rating}
                <StarBorderIcon className="rating-star"></StarBorderIcon>
              </Typography>
            )}

            {showPrice(props.price) && (
              <Typography className="product-price">
                {props.price.low}$ - {props.price.high}$
              </Typography>
            )}
          </div>
          <Typography className="product-title">
            {props.fullName}
          </Typography>
          {props.desc &&
            <Typography className="product-description">{props.desc}</Typography>
          }
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
}

ProductCard.propTypes = {
  id: PropType.string,
  title: PropType.string,
  fullName: PropType.string,
  desc: PropType.string,
  price: PropType.shape({
    low: PropType.number,
    high: PropType.number,
    avg: PropType.number,
  }),
  rating: PropType.number,
  images: PropType.array,
};
