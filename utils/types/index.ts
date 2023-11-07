export interface UserInReq {
  name: string;
  role: "Admin" | "Customer";
  phone: string;
  iat: Date;
  exp: Date;
}
