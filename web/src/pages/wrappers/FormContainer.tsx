import { Paper } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import * as React from "react";
import { isMobile } from "react-device-detect";
import logo from "../../logo.png";

export function FormContainer(props: any) {
  return (
    <div
      style={{
        display: "flex",
        // paddingTop: "17vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue",
        position: "absolute",
        minHeight: "100vh",
        minWidth: "100vw",
        background: "linear-gradient(to right, #ada996, #f2f2f2, #dbdbdb, #eaeaea)"
      }}
    >
      {/* <Typography variant="h3">DocketApp</Typography>
      <Divider /> */}
      <Paper
        elevation={3}
        style={{
          background: "linear-gradient(to right, #ada996, #f2f2f2, #dbdbdb, #eaeaea)",
          padding: "10px",
          margin: "10px",
          minHeight: isMobile ? "80vh" : "65vh ",
          maxHeight: "65vh",
          minWidth: isMobile ? "95vw" : "450px",
          maxWidth: isMobile ? "95vw" : "27vw",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} alt="Logo" />
        </div>
        <Divider style={{ margin: "3px 0px 3px 0px" }} />
        {props.component}
      </Paper>
    </div>
  );
}
