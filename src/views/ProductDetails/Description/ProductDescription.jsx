import React, { useEffect } from "react";
import { Typography, Divider, Paper, Box, Chip } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import ReactImageGallery from "react-image-gallery";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import "./ProductDescription.scss";
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { tagColor } from "../../../@utils/tagColor";

export default function ProductDescription({ product }) {
  const [t] = useTranslation();
  const [images, setImages] = useState([]);

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
      setImages(newImages);
    }
  }, [product]);

  return (
    <Paper elevation={3} className="main">
      <Box>
        <ReactImageGallery
          items={images}
          lazyLoad
          showNav={false}
          showFullscreenButton={false}
          useBrowserFullscreen={false}
          showPlayButton={false}
        />
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

      <Box className="desc-container">
        <Box>
          <Typography align="left" className="desc-title">
            {product?.fullName}
          </Typography>
          <Typography align="left" className="sub-title">
            {product?.price ? `${product?.price.low}$ - ${product?.price.high}$` : "-"}
          </Typography>
        </Box>
        <Divider style={{ marginTop: "10px", marginBottom: "20px" }} />
        <Box>
          <Typography paragraph align="left" className="category-title">
            {t("Description")}
          </Typography>
          <div align="left" className="category-body"
            dangerouslySetInnerHTML={{
              __html: product?.description?.description,
            }}
          ></div>
        </Box>

        {product?.rating && (
          <>
            <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
            <Box textAlign="left">
              <Typography
                component="legend"
                gutterBottom
                className="category-title"
              >
                {t("Rating")}
              </Typography>
              <div className="ratings">
                <Rating
                  name="Product-rating"
                  value={4}
                  precision={0.5}
                // onChange={(event, newValue) => {
                //   console.log(event);
                //   setValue(newValue);
                // }}
                // onChangeActive={(event, newHover) => {
                //   setHover(newHover);
                // }}
                />
                <Typography>
                  <Box ml={2}>({4})</Box>
                </Typography>
              </div>
              )
            </Box>
          </>
        )}

        <Divider style={{ marginTop: "30px", marginBottom: "10px" }} />
        <Box textAlign="left">
          <Typography
            component="legend"
            gutterBottom
            className="category-title"
          >
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
      </Box>
    </Paper>
  );
}
