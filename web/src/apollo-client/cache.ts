import { InMemoryCache } from "@apollo/client";
import { isAdmin, isLoggedIn, loadingLogin, token } from "./reactiveVariables";

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return isLoggedIn();
                    }
                },
                loading: {
                    read() {
                        return loadingLogin();
                    }
                },
                token: {
                    read() {
                        return token();
                    }
                },
                isAdmin: {
                    read() {
                        return isAdmin();
                    }
                }

            }
        }
    }
}) as any;