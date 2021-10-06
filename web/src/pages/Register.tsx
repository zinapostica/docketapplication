import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { RouteComponentProps } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql";
import { message } from "../apollo-client/reactiveVariables";
import { displayFetchError, displayResponseMessage } from "../utils/displayMessage";
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
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompany] = useState("");
  const [register] = useRegisterMutation();

  return (
    <FormContainer component={<Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Typography component="h1" variant="h5" color="primary">
        Sign up
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="company"
              label="Company Name"
              name="company"
              autoComplete="company"
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
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
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={async (e) => {
            e.preventDefault();
            if (email && password && firstName && lastName && companyName) {
              try {
                const response = await register({
                  variables: {
                    email,
                    password,
                    firstName,
                    lastName,
                    companyName,
                  },
                });
                displayResponseMessage(
                  response.data?.register|| false,
                  "Successfully registered user",
                  "Could not register user"
                );
                history.push("/");
              } catch (err) {
                displayFetchError();
              }
            } else {
              message({
                ...message(),
                open: true,
                message: "All fields are required",
                severity: "error",
              });
            }
          }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link
              href="#"
              variant="body2"
              onClick={() => {
                history.push("/login");
              }}
            >
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  </Container>}/>
    
  );
};
