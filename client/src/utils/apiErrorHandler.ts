import { AxiosError } from "axios";

const apiErrorHandler = (error: AxiosError): string | null => {
    if (error.response) {
        console.error("Server Error:", error.response.status);

        return `${error.response.status}: ${error.message}`;
    } else if (error.request) {
        console.error("Network Error:", error.request);
    } else {
        console.error("Error:", error.message);
    }

    return null;
};

export default apiErrorHandler;
