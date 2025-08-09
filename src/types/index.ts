export type { ISendOtp } from "./auth.type";

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
