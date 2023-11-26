import { body } from "express-validator";

const userRoles = ["admin", "user"];

const registerValidator = [
    body("email")
        .notEmpty()
        .withMessage("Email required")
        .isEmail()
        .escape()
        .trim()
        .withMessage("Invalid email"),
    body("password", "Must be at least 6 characters")
        .isLength({ min: 6 })
        .escape()
        .trim(),
    // body("roles")
    //     .isArray()
    //     .custom((values) => {
    //         if (values.length === 0) {
    //             return false;
    //         }

    //         return true;
    //     })
    //     .withMessage("Must have a role")
    //     .custom((values) => {
    //         return values.every((value: string) => userRoles.includes(value));
    //     })
    //     .escape()
    //     .trim(),
    body("fullName")
        .notEmpty()
        .withMessage("Full name required")
        .escape()
        .trim(),
    body("phone").notEmpty().withMessage("Phone required").escape().trim(),
];

const loginValidator = [
    body("email")
        .notEmpty()
        .withMessage("Email required")
        .isEmail()
        .escape()
        .trim()
        .withMessage("Invalid email"),
    body("password", "Must be at least 6 characters")
        .isLength({ min: 6 })
        .escape()
        .trim(),
];

export { registerValidator, loginValidator };
