import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    justifyContent:"center",
  },
}));

export const Loading: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};
