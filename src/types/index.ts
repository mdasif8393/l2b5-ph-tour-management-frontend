import { ComponentType } from "react";

export type { ISendOtp, IVerifyOtp } from "./auth.type";
export type { ITourPackage } from "./tour.type";

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
  // meta: {
  //   page: number;
  //   limit: number;
  //   total: number;
  //   totalPage: number;
  // };
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export interface IDivision {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";
