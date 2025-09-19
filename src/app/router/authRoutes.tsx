import { ROUTES } from "@/constants/routeConstants";

import { lazy } from "react";

const Login = lazy(() => import("../../features/auth/Login"));
const RegisterPage = lazy(() => import("../../features/auth/RegisterPage"));

export const authRoutes = [
  {
    path: `${ROUTES.AUTH}/${ROUTES.LOGIN}`,
    element: <Login />,
  },
  {
    path: `${ROUTES.AUTH}/${ROUTES.REGISTER}`,
    element: <RegisterPage />,
  },
];
