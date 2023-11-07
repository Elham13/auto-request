import { UserInReq } from "./utils/types/index";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserInReq;
  }
}
