import apiErrorHandler from "@/utils/apiErrorHandler";
import axios, { AxiosError } from "axios";

// TODO - use env
const API_BASE_URL = "http://localhost:8080/api/v1";

type RegisterInput = {
    fullName: string;
    phone: string;
    email: string;
    password: string;
};

type RegisterResponse = {
    message: string;
};

const register = async (args: RegisterInput): Promise<> => {
    let response = undefined;
    await axios
        .post<RegisterResponse>(`${API_BASE_URL}/auth/register`, args)
        .then((response) => {})
        .catch((error: AxiosError) => apiErrorHandler(error));

    return response;
};

export { register };
