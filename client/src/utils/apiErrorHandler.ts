import { AxiosError } from "axios";

export type ErrorResponseData = {
    error: {
        message: string;
    };
};

const apiErrorHandler = (
    error: AxiosError<ErrorResponseData>
): string | null => {
    if (error.response) {
        console.error("Server Error:", error.response.status);

        return `${error.response.status}: ${error.response.data.error.message}`;
    } else if (error.request) {
        console.error("Network Error:", error.request);
    } else {
        console.error("Error:", error.message);
    }

    return null;
};

export default apiErrorHandler;
