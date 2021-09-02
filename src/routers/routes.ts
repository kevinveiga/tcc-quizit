import { ComponentProps, ComponentType } from 'react';

import { LayoutAdmin } from '../components/layout/layoutAdmin';
import { LayoutDefault } from '../components/layout/layoutDefault';
import { LayoutNoFooter } from '../components/layout/layoutNoFooter';

import Ajuda from '../screens/ajuda/ajuda';
import Login from '../screens/login/login';
import LoginCreate from '../screens/login/loginCreate';
import * as Admin from '../screens/admin';

/**
 * Interface de rotas
 * @param {boolean} authRequired - Se a rota precisa de autenticação
 * @param {Component} component - Componente da rota
 * @param {Component} layout - Componente de estrutura do layout
 * @param {string} routeLabel - Label da rota
 * @param {boolean} showInMenu - Mostra no menu
 */
export interface IRoutes {
    authRequired?: boolean;
    component: ComponentType<ComponentProps<any>> | ComponentType<any>;
    layout: ComponentType<ComponentProps<any>> | ComponentType<any>;
    order?: number;
    routeLabel: string;
    showHeader?: boolean;
    showInMenu?: boolean;
}

export const routes: IRoutes[] = [
    {
        authRequired: false,
        component: Ajuda,
        layout: LayoutDefault,
        order: 1,
        routeLabel: 'Ajuda'
    },
    {
        authRequired: false,
        component: Login,
        layout: LayoutNoFooter,
        order: 0,
        routeLabel: 'Login',
        showHeader: false
    },
    {
        authRequired: false,
        component: LoginCreate,
        layout: LayoutNoFooter,
        order: 0,
        routeLabel: 'Criar Login',
        showHeader: false
    },
    // Admin
    {
        component: Admin.Admin,
        layout: LayoutAdmin,
        order: 0,
        routeLabel: 'Admin'
    }
];
