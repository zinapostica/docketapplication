import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloLink,
  Observable,
  HttpLink,
} from "@apollo/client";
import { onError } from "apollo-link-error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { displayFetchError } from "../utils/displayMessage";
import { cache } from "./cache";
import { token, isLoggedIn } from "./reactiveVariables";
interface MyToken {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
}

const requestLink: ApolloLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessTokenVal = token();
          if (accessTokenVal) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessTokenVal}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);
const tokenRefreshLink: any = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const accessToken = token();

    if (!accessToken) {
      return true;
    }

    try {
      const decoded = jwtDecode<MyToken>(accessToken || " ");

      if (Date.now() >= decoded.exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch(process.env.REACT_APP_URI + "/refresh_token", {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessTokenVal) => {
    isLoggedIn(true);
    token(accessTokenVal);
  },
  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

export const client: any = new ApolloClient<NormalizedCacheObject>({
  link: ApolloLink.from([
    tokenRefreshLink,
    onError(({ graphQLErrors, networkError }) => {
      displayFetchError();
    }),
    requestLink,
    new HttpLink({
      uri: process.env.REACT_APP_URI!,
      credentials: "include",
    }),
  ]) as any,
  cache,
});
