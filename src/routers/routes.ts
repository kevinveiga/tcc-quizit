import { IRoutes } from '../interface';

import { LayoutAdmin } from '../components/layout/layoutAdmin';
import { LayoutNoFooter } from '../components/layout/layoutNoFooter';

import Admin from '../screens/admin/admin';
import Login from '../screens/login/login';
import LoginAdmin from '../screens/login/loginAdmin';
import LoginCreate from '../screens/login/loginCreate';
import LoginPasswordReset from '../screens/login/loginPasswordReset';
import Questoes from '../screens/usuario/questoes';
import QuestoesCategoria from '../screens/usuario/questoesCategorias';

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
    },
    // ADMIN
    {
        adminRole: true,
        component: Admin,
        layout: LayoutAdmin,
        order: 0,
        routeLabel: 'Admin'
    },
    // USER
    {
        component: Questoes,
        layout: LayoutAdmin,
        order: 0,
        routeLabel: 'Questões'
    },
    {
        component: QuestoesCategoria,
        layout: LayoutAdmin,
        order: 0,
        routeLabel: 'Categorias Questões'
    }
];
