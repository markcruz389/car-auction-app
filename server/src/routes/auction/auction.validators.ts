import { body } from "express-validator";

import { getCarTypeByKey } from "../../models/car-type/car-type.model";

const createAuctionValidator = [
    body("carBrand")
        .isString()
        .notEmpty()
        .withMessage("Brand is required")
        .escape()
        .trim(),
    body("carYear").isNumeric().notEmpty().withMessage("Year is required"),
    body("carType")
        .isString()
        .notEmpty()
        .withMessage("Type is required")
        .custom(async (value) => {
            const type = await getCarTypeByKey(value);
            if (type === null) {
                throw new Error("Invalid type");
            }

            return true;
        })
        .withMessage("Invalid type")
        .escape()
        .trim(),
    body("openingPrice")
        .notEmpty()
        .withMessage("Opening price required")
        .isFloat({ min: 0 })
        .withMessage("Value must be more than 0")
        .escape(),
    body("priceIncrement")
        .isFloat({ min: 0 })
        .withMessage("Value must be more than 0")
        .escape(),
    body("expiryDate")
        .isISO8601()
        .toDate()
        .withMessage("Invalid date format")
        .escape(),
];

export { createAuctionValidator };
