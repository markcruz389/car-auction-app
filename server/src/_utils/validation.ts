import { isValidObjectId } from "mongoose";

const validateObjectId = (_id: string) => {
    return isValidObjectId(_id);
};

export { validateObjectId };
