import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { PrivateRoute } from "./PrivateRoute";
import { isLoggedIn, loadingLogin } from "../apollo-client/reactiveVariables";
import { useReactiveVar } from "@apollo/client";
import { Loading } from "../components/core/Loading/Loading";
import { ChangePassword } from "../pages/ChangePassword";
import { AdminRoute } from "./AdminRoute";
import RootPage from "../pages/wrappers/RootPage";
import { ManageUsersPage } from "../pages/ManageUsersPage";
import { Announcements } from "../pages/Announcements";
import { ForgotPassword } from "../pages/ForgotPassword";
import { ChangeForgottenPassword } from "../pages/ChangeForgottenPassword";

export const Routes: React.FC = () => {
  const isLogged = useReactiveVar(isLoggedIn);
  const isLoading = useReactiveVar(loadingLogin);
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/">
            {isLoading ? (
              "loading"
            ) : isLogged ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute
            exact
            path="/changePassword"
            component={ChangePassword}
          />
          <Route
            exact
            path="/changeForgottenPassword/:token"
            component={ChangeForgottenPassword}
          />
          <PrivateRoute exact path="/announcements" component={Announcements} />
          <AdminRoute exact path="/manageUsers" component={ManageUsersPage} />
          <AdminRoute exact path="/rootPage" component={RootPage} />
          {/* no match */}
          <Route exact path="*">
            {isLoading ? (
              <Loading />
            ) : isLogged ? (
              <Redirect to="/home" />
            ) : (
              <Login />
            )}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};
