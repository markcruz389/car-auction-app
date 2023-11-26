import users, { UserRole } from "./user.schema";
import bcrypt from "bcryptjs";

type UserResult = {
    _id: string;
    email: string;
    roles: Array<UserRole>;
    fullName: string;
};

type UserResultWithPassword = UserResult & { password: string };

type CreateUserInput = {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    roles: Array<UserRole>;
};

const getUserByEmail = async (
    email: string
): Promise<UserResultWithPassword | null> => {
    return await users.findOne({ email }, { __v: 0 });
};

const createUser = async (args: CreateUserInput): Promise<UserResult> => {
    const { password, ...data } = args;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const doc = await users.create({ ...data, password: hash });

    return { ...data, _id: doc._id };
};

export { getUserByEmail, createUser };
