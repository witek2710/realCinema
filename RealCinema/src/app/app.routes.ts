
import { AuthorizedRoutes } from '@devon4ng/authorization';
import { Permission } from './security/model/permission';

export const test: AuthorizedRoutes<Permission> = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard'
    },
];
  