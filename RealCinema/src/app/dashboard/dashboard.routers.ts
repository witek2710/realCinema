import { AuthorizationGuard, AuthorizedRoutes } from "@devon4ng/authorization";
import { HeaderComponent } from "../header/header.component";
import { Permission } from "../security/model/permission";

export const dashboardRoutes: AuthorizedRoutes<Permission> = [
    {
        path: '',
        canActivate: [AuthorizationGuard],
        children: [
            {
                path: '',
                component: HeaderComponent,
                // children: [
                //     {
                //         path: '',

                //     },
                // ]
            },
        ],
    },
];