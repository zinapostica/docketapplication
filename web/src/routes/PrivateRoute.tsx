import { useReactiveVar } from "@apollo/client";
import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { isLoggedIn, loadingLogin } from "../apollo-client/reactiveVariables";
import { Loading } from "../components/core/Loading/Loading";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const isLogged = useReactiveVar(isLoggedIn);
  const isLoading = useReactiveVar(loadingLogin);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLoading ? (
          <Loading/>
        ) : isLogged ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};
