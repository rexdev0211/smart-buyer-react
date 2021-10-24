import React from "react";
import Rating from "@material-ui/lab/Rating";
import { Avatar, Box, Divider, Paper, Typography } from "@material-ui/core";
import "./ProductRatings.scss";

export default function ProductRatings() {
  return (
    <Paper elevation={3} style={{ marginTop: "25px", padding: "25px" }}>
      <Box>
        <Box>
          <div className="flexCenter" style={{ justifyContent: "center" }}>
            <Avatar
              className="rating-circle nunito-bold"
              style={{ fontSize: 25 }}
            >
              4.1
            </Avatar>
          </div>
          <Rating value={8.5} precision={0.5} size={"large"} readOnly />
          <Typography className="nunito-bold" style={{ fontSize: 18 }}>
            4.1 Out Of 5
          </Typography>
          <Typography className="nunito-regular-min"> 202 Ratings</Typography>
        </Box>

        <Divider style={{ marginTop: 20, marginBottom: 20 }}></Divider>

        <Box>
          {[5, 4, 3, 2, 1].map((val) => (
            <div className="flexCenter">
              <Typography className="nunito-regular" style={{ fontSize: 14 }}>
                {val} star
              </Typography>
              <Rating value={8.5} precision={0.5} size={"large"} readOnly />
              <Typography className="nunito-regular" style={{ fontSize: 14 }}>
                (10)
              </Typography>
            </div>
          ))}
        </Box>
        <Divider style={{ marginTop: 20, marginBottom: 20 }}></Divider>
        <Box>
          <Typography className="nunito-regular" style={{ fontSize: 18 }}>
            94% of users recommend this product to a friend.
          </Typography>
          <Typography className="nunito-bold" style={{ fontSize: 22 }}>
            Rate This Product:
          </Typography>
          <Rating value={8.5} precision={0.5} />
        </Box>
      </Box>
    </Paper>
  );
}
