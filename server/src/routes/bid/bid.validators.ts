import { body } from "express-validator";
import { validateObjectId } from "../../_utils/validation";

const addBidValidator = [
    body("auctionId")
        .isString()
        .notEmpty()
        .withMessage("Auction ID is required")
        .custom(validateObjectId)
        .withMessage("Invalid Auction ID")
        .escape()
        .trim(),
];

export { addBidValidator };
