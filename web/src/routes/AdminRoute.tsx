import { useReactiveVar } from "@apollo/client";
import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { isAdmin, isLoggedIn, loadingLogin } from "../apollo-client/reactiveVariables";
import { Loading } from "../components/core/Loading/Loading";

interface AdminRouteProps extends RouteProps {
  component: any;
}

export const AdminRoute: React.FC<AdminRouteProps> = (
  props: AdminRouteProps
) => {
  const isUserAdmin = useReactiveVar(isAdmin);
  const { component: Component, ...rest } = props;
  const isLogged = useReactiveVar(isLoggedIn);
  const loading = useReactiveVar(loadingLogin);
 
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        loading  ? (
          <Loading />
        ) : isLogged && isUserAdmin ?  (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};
