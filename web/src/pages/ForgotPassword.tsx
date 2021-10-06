import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import {
  displayFetchError,
  displayResponseMessage,
} from "../utils/displayMessage";
import { useForgotPasswordMutation } from "../generated/graphql";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { FormContainer } from "./wrappers/FormContainer";
const useStyles = makeStyles((theme) => ({
  paper: {
    //  marginTop: theme.spacing(8),
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

export function ForgotPassword() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <FormContainer
      component={
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5"  color="primary">
              Forgot Password
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={async (e) => {
                  e.preventDefault();
                  if (email) {
                    try {
                      const { data } = await forgotPassword({
                        variables: {
                          email,
                        },
                      });
                      displayResponseMessage(
                        data?.forgotPassword || false,
                        "Password reset instructions have been sent to your email",
                        "Reset password attempt failed"
                      );
                    } catch (err) {
                      displayFetchError();
                    }
                  }
                }}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => {
                      history.push("/login");
                    }}
                  >
                    Back to login
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => {
                      history.push("/register");
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      }
    ></FormContainer>
  );
}
