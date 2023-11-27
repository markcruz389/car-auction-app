import { AuctionStatus } from "../models/auction/auction.schema";
import { UserRole } from "../models/user/user.schema";

const AUCTION_STATUS: Record<string, AuctionStatus> = {
    OPEN: "open",
    CLOSED: "closed",
};
Object.freeze(AUCTION_STATUS);

const USER_ROLE: Record<string, UserRole> = {
    ADMIN: "admin",
    USER: "user",
};
Object.freeze(USER_ROLE);

export { AUCTION_STATUS, USER_ROLE };
