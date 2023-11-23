import { AuctionStatus } from "../models/auction/auction.schema";
import { UserRole } from "../models/user/user.schema";

const AUCTION_STATUS: Record<string, AuctionStatus> = {
    OPEN: "open",
    CLOSED: "closed",
};

const USER_ROLE: Record<string, UserRole> = {
    ADMIN: "admin",
    USER: "user",
};

export { AUCTION_STATUS, USER_ROLE };
