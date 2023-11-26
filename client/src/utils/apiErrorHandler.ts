import { AxiosError } from "axios";

const apiErrorHandler = (error: AxiosError) => {
    if (error.response) {
        console.error("Server Error:", error.response.status);
    } else if (error.request) {
        console.error("Network Error:", error.request);
    } else {
        console.error("Error:", error.message);
    }
};

export default apiErrorHandler;
