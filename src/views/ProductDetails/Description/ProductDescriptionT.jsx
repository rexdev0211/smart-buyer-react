import React, { useEffect } from "react";
import {
  Box,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import ReactImageGallery from "react-image-gallery";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { useTranslation } from "react-i18next";
import "./ProductDescription.scss";
import Rating from "@material-ui/lab/Rating";
import { NavLink } from "react-router-dom";
import { tagColor } from "../../../@utils/tagColor";

let images = [];

export default function ProductDescriptionT({ product }) {
  const [t] = useTranslation();

  useEffect(() => {
    if (product) {
      const newImages = [];
      const largeImages = product.images?.filter((img) => img.size === "large");
      const thumbImages = product.images?.filter((img) => img.size === "thumb");

      for (let i = 0; i < largeImages.length; i++) {
        newImages.push({
          original: largeImages[i].url,
          thumbnail: thumbImages[i].url,
        });
      }
      images = newImages;
    }
  }, [product]);

  return (
    <Paper elevation={3} className="main">
      <Box>
        <Typography align="left" className="desc-title">
          {product?.fullName}
        </Typography>
        {product?.rating && (
          <div className="ratings">
            <Rating name="Product-rating" value={4} precision={0.5} />
            <Typography>
              <Box ml={2}>({4})</Box>
            </Typography>
          </div>
        )}
      </Box>

      <ReactImageGallery
        items={images}
        lazyLoad
        showNav={false}
        showFullscreenButton={false}
        useBrowserFullscreen={false}
        showPlayButton={false}
        thumbnailPosition={"left"}
      />

      <Box display={"flex"} mt={3}>
        <Box flex="0 0 200px">
          <Typography gutterBottom align="left" className="category-title">
            {t("Price")}
          </Typography>
          <Typography align="left" className="sub-title">
            {product?.price ? `${product?.price.low}$ - ${product?.price.high}$` : "-"}
          </Typography>

          <Divider style={{ marginTop: 10, marginBottom: 10 }} />

          <Box textAlign="left">
            <Typography gutterBottom className="category-title">
              {t("Tags")}
            </Typography>
            {product?.tags?.map((tag, i) => (
              <Chip
                key={i}
                label={tag.name}
                color="primary"
                style={{ marginRight: 10, marginBottom: 10, backgroundColor: tagColor(tag.name), color: "white" }}
                clickable
                component={NavLink}
                to={`/tag/${tag.url}`}
              />
            ))}
          </Box>

          <Box className="social-group">
            <FacebookShareButton
              url={window.location.href}
              quote={product?.fullName}
            >
              <FacebookIcon size={36} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={window.location.href}
              quote={product?.fullName}
              // hashtag="#camperstribe"
              style={{ marginLeft: 20 }}
            >
              <TwitterIcon size={36} round />
            </TwitterShareButton>
          </Box>
        </Box>

        <Divider
          flexItem
          orientation={"vertical"}
          style={{ marginLeft: 10, marginRight: 20 }}
        />

        <Box>
          <Typography gutterBottom align="left" className="category-title">
            {t("description")}
          </Typography>
          <div align="left" className="category-body"
            dangerouslySetInnerHTML={{
              __html: product?.description?.description,
            }}
          ></div>
        </Box>
      </Box>
    </Paper>
  );
}
