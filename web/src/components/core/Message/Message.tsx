import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export interface IMessageProps {
  severity: string;
  message: string;
  open: boolean,
  close: Function    
  }


export const Message: React.FC<IMessageProps> = (props: IMessageProps) => {
  const classes = useStyles();

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    props.close();
  };

  return (
    <div className={classes.root}>
      <Snackbar open={props.open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.severity}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
