import { IRoutes } from '../interface';

import { LayoutAdmin } from '../components/layout/layoutAdmin';
import { LayoutNoFooter } from '../components/layout/layoutNoFooter';

import QuestaoCriar from '../screens/admin/questaoCriar';
import QuestaoEditar from '../screens/admin/questaoEditar';
import QuestoesListar from '../screens/admin/questoesListar';
import Login from '../screens/login/login';
import LoginAdmin from '../screens/login/loginAdmin';
import LoginCreate from '../screens/login/loginCreate';
import LoginPasswordReset from '../screens/login/loginPasswordReset';
import Questoes from '../screens/usuario/questoes';
import QuestoesCategoria from '../screens/usuario/questoesCategorias';
import Resultado from '../screens/usuario/resultado';

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
        component: QuestaoCriar,
        layout: LayoutAdmin,
        order: 0,
        routeLabel: 'Questão Criar'
    },
    {
        adminRole: true,
        component: QuestaoEditar,
        layout: LayoutAdmin,
        order: 0,
        routeLabel: 'Questão Editar',
        showInMenu: false
    },
    {
        adminRole: true,
        component: QuestoesListar,
        layout: LayoutAdmin,
        order: 0,
        routeLabel: 'Questões Listar'
    },
    // USER
    {
        component: Questoes,
        layout: LayoutAdmin,
        order: 0,
        routeLabel: 'Questões',
        showInMenu: false
    },
    {
        component: QuestoesCategoria,
        layout: LayoutAdmin,
        order: 0,
        routeLabel: 'Categorias Questões'
    },
    {
        component: Resultado,
        layout: LayoutAdmin,
        order: 0,
        routeLabel: 'Resultado',
        showInMenu: false
    }
];
