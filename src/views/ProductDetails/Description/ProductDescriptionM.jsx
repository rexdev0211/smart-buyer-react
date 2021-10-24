import React, { useEffect } from "react";
import {
  Box,
  Chip,
  Divider,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import ReactImageGallery from "react-image-gallery";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { useTranslation } from "react-i18next";
import SbRadioButtonGroup from "../../../components/SbRadioButtonGroup/SbRadioButtonGroup";
import { NavLink } from "react-router-dom";
import "./ProductDescription.scss";
import { tagColor } from "../../../@utils/tagColor";

let images = [];

export default function ProductDescriptionM({ product }) {
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

  const renderWeightRow = (title, attrib) => {
    let unit = attrib.unit;

    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {title}
        </TableCell>
        <TableCell align="right">
          {attrib[unit]} {unit}
        </TableCell>
      </TableRow>
    );
  };

  const renderSizeRow = (title, attrib) => {
    let unit = attrib.unit;

    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {title}
        </TableCell>
        <TableCell align="right">
          {attrib.w[unit]} x {attrib.l[unit]} x {attrib.h[unit]} {unit}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
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
      <Box style={{ marginRLeft: 500 }}>
        <ReactImageGallery
          items={images}
          lazyLoad
          showNav={false}
          showFullscreenButton={false}
          useBrowserFullscreen={false}
          showPlayButton={false}
          thumbnailPosition="bottom"
        />
      </Box>

      <Paper elevation={3} className="main">
        <Box flex="0 0 200px">
          <Typography gutterBottom align="left" className="category-title">
            {t("Price")}
          </Typography>
          <Typography align="left" className="sub-title">
            {product?.price ? `${product?.price.low}$ - ${product?.price.high}$` : "-"}
          </Typography>
        </Box>

        <Divider style={{ marginTop: 15, marginBottom: 15 }} />

        <Box>
          <Typography gutterBottom align="left" className="category-title">
            {t("Description")}
          </Typography>
          <div align="left" className="category-body"
            dangerouslySetInnerHTML={{
              __html: product?.description?.description,
            }}
          ></div>
        </Box>

        <Divider style={{ marginTop: 15, marginBottom: 15 }} />

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

        <Divider style={{ marginTop: 15, marginBottom: 15 }} />
        <Box>
          {product?.color && (
            <>
              <SbRadioButtonGroup
                title="Colors"
                values={["Black", "Red", "Green", "Blue"]}
              ></SbRadioButtonGroup>
              <Divider />
            </>
          )}
          <TableContainer component={Paper} style={{ marginTop: 15 }}>
            <Table>
              <TableBody>
                {product?.size?.product?.unit &&
                  renderSizeRow("Size", product?.size?.product)}
                {product?.weight?.product?.unit &&
                  renderWeightRow("Weight", product?.weight?.product)}
              </TableBody>
            </Table>
          </TableContainer>
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
      </Paper>
    </>
  );
}
