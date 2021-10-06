import React, { useEffect } from "react";
import { Routes } from "./routes/Routes";
import {
  token,
  isLoggedIn,
  loadingLogin,
  message,
  isAdmin,
} from "./apollo-client/reactiveVariables";
import { Message } from "./components/core/Message/Message";
import { useReactiveVar } from "@apollo/client";

export const App: React.FC = () => {
  const alertMessage = useReactiveVar(message);

  useEffect(() => {
    fetch(process.env.REACT_APP_URI_REST + "/refresh_token", {
      method: "POST",
      credentials: "include",
    })
      .then(async (x) => {
        const { accessToken, ok, user } = await x.json();
        if (ok) {
          token(accessToken);
          isAdmin(user.isAdmin);
          isLoggedIn(true);
          

          loadingLogin(false);
        } else {
          token("");
          isLoggedIn(false);
          loadingLogin(false);
        }
      })
      .catch((err) => {
        loadingLogin(false);
      });
  }, []);

  return (
    <div>
      <Routes  />
      <Message
        message={alertMessage.message}
        open={alertMessage.open}
        severity={alertMessage.severity}
        close={alertMessage.close}
      />
    </div>
  );
};
