import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { TRole } from "@/types";
import { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    // if user not login redirect to login page
    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" />;
    }

    // if user role and role come from route is not matched then redirect user to unauthorized page
    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
