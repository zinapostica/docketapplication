import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  title: string;
  handleClose: () => void;
  open: boolean;
  text: any;
  actions: { type: string; action: () => void }[];
  fullWidth: boolean | undefined;
  maxWidth: false | "md" | "xs" | "sm" | "lg" | "xl" | undefined
}

export const PopUp: React.FC<Props> = (props) => {
  return (
    <Dialog
      maxWidth={props.maxWidth}
      fullWidth={props.fullWidth}
      open={props.open}
      onClose={() => {
        props.handleClose();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.actions.map((val,index) => (
          <Button
            key={index}
            onClick={() => {
              val.action();
            }}
            color="primary"
          >
            {val.type}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};
