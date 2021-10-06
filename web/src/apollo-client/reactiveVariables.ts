import { makeVar } from "@apollo/client";
import { IMessageProps } from "../components/core/Message/Message";
const initialMessage: IMessageProps = {
    message: "",
    open: false,
    severity: "",
    close: () => {
        message({ ...message(), open: false });
      }
}
export const isLoggedIn = makeVar(false);
export const token = makeVar("");
export const loadingLogin = makeVar(true);
export const message = makeVar(initialMessage);
export const isAdmin = makeVar(false);