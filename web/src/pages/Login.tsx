import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useLoginMutation, MeDocument, MeQuery } from "../generated/graphql";
import { useHistory } from "react-router-dom";
import {
  isAdmin,
  isLoggedIn,
  message,
  token,
} from "../apollo-client/reactiveVariables";
import { displayFetchError } from "../utils/displayMessage";
import { FormContainer } from "./wrappers/FormContainer";

const useStyles = makeStyles((theme) => ({
  paper: {
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

export const Login: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  return (
    <FormContainer
      component={
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" color="primary">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
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
                  if (email && password)
                    try {
                      const response = await login({
                        variables: {
                          email,
                          password,
                        },
                        update: (store, { data }) => {
                          if (!data) {
                            return null;
                          }

                          store.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: {
                              me: data.login.user,
                            },
                          });
                        },
                      });

                      if (response && response.data) {
                        isLoggedIn(true);
                        isAdmin(response.data.login.user?.isAdmin ? response.data.login.user.isAdmin : false);
                        token(response.data.login.accessToken);
                        message({
                          ...message(),
                          open: true,
                          message: "Successfully logged in",
                          severity: "success",
                        });
                        history.push("/");
                      }
                    } catch (err) {
                      displayFetchError();
                    }
                  else {
                    message({
                      ...message(),
                      open: true,
                      message: "All fields are required",
                      severity: "error",
                    });
                  }
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => {
                      history.push("/forgotPassword");
                    }}
                  >
                    Forgot password?
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
    />
  );
};
