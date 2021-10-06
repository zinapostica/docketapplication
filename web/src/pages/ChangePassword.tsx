import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useChangePasswordMutation } from "../generated/graphql";
import { useState } from "react";
import { message } from "../apollo-client/reactiveVariables";
import { displayFetchError } from "../utils/displayMessage";
import RootPage from "./wrappers/RootPage";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function ChangePassword() {
  const classes = useStyles();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePasswordMutation] = useChangePasswordMutation();

  return (
    <RootPage
      component={
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="currentPassword"
                label="Current Password"
                name="CurrentPassword"
                autoComplete="currentPassword"
                type="password"
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
                value={currentPassword}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="newPassword"
                label="New Password"
                name="newPassword"
                autoComplete="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={async (e) => {
                  e.preventDefault();
                  if (newPassword && currentPassword) {
                    try {
                      const { data } = await changePasswordMutation({
                        variables: {
                          currentPassword,
                          newPassword,
                        },
                      });
                      if (data) {
                        message({
                          ...message(),
                          open: true,
                          message: data.changePassword.message,
                          severity: data.changePassword.isChanged
                            ? "success"
                            : "error",
                        });
                        if (data.changePassword.isChanged) {
                          setCurrentPassword("");
                          setNewPassword("");
                        }
                      }
                    } catch (err) {
                      displayFetchError();
                    }
                  }
                }}
              >
                Submit
              </Button>
            </form>
          </div>
        </Container>
      }
    />
  );
}
