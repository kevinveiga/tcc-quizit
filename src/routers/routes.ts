import { IRoutes } from '../interface';

import { LayoutAdmin } from '../components/layout/layoutAdmin';
import { LayoutDefault } from '../components/layout/layoutDefault';
import { LayoutNoFooter } from '../components/layout/layoutNoFooter';

import Admin from '../screens/admin/admin';
import Login from '../screens/login/login';
import LoginAdmin from '../screens/login/loginAdmin';
import LoginCreate from '../screens/login/loginCreate';
import LoginPasswordReset from '../screens/login/loginPasswordReset';
import Usuario from '../screens/usuario/usuario';

export const routes: IRoutes[] = [
    {
        authRequired: false,
        component: Login,
        layout: LayoutNoFooter,
        order: 0,
        routeLabel: 'Login',
        showHeader: false,
        showInMenu: false
    },
    {
        authRequired: false,
        component: LoginAdmin,
        layout: LayoutNoFooter,
        order: 0,
        routeLabel: 'Login Admin',
        showHeader: false,
        showInMenu: false
    },
    {
        authRequired: false,
        component: LoginCreate,
        layout: LayoutNoFooter,
        order: 0,
        routeLabel: 'Criar Login',
        showHeader: false,
        showInMenu: false
    },
    {
        authRequired: false,
        component: LoginPasswordReset,
        layout: LayoutNoFooter,
        order: 0,
        routeLabel: 'Esqueci a senha',
        showHeader: false,
        showInMenu: false
    }
];

export const routesAdmin: IRoutes[] = [
    {
        component: Admin,
        layout: LayoutAdmin,
        order: 0,
        routeLabel: 'Admin'
    }
];

export const routesUser: IRoutes[] = [
    {
        component: Usuario,
        layout: LayoutDefault,
        order: 0,
        routeLabel: 'Usuario'
    }
];
