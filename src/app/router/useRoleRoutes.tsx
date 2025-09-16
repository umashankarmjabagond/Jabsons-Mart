
import type { RouteObject } from "react-router-dom";
import HomeLayout from "../layouts/homeLayouts";
import UserRoutes from "./user/userRoutes";

export const useRoleRoutes = (): RouteObject[] => {

    const role = "user"
    if (role === "user") {
        return [
            {
                element: <HomeLayout />,
                children: UserRoutes,
            },
        ];
    }
    return [
        {
            path: "*",
            element: <div>Unauthorized</div>,
        },
    ];
};