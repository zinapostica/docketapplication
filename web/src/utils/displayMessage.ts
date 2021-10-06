import { message } from "../apollo-client/reactiveVariables";

export const displayFetchError = () => {
    message({
        ...message(),
        open: true,
        message: "Failed to fetch from the server",
        severity: "error",
    });
}

export const displayEmptyFieldError = () => {
    message({
        ...message(),
        open: true,
        message: "All fields are required",
        severity: "error",
    });
}

export const displayResponseMessage = (response: boolean, success: string, fail: string) => {
    if (response) {
        message({
            ...message(),
            open: true,
            message: success,
            severity: "success",
        });
    } else {
        message({
            ...message(),
            open: true,
            message: fail,
            severity: "error",
        });
    }
}