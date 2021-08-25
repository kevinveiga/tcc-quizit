import { ComponentProps, ComponentType } from 'react';

import LayoutAdmin from '../Component/Layout/LayoutAdmin';
import LayoutDefault from '../Component/Layout/LayoutDefault';

import Home from '../Screen/Home/Home';
import * as MinhaConta from '../Screen/MinhaConta';

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
    showInMenu?: boolean;
}

export const routes: IRoutes[] = [
    {
        authRequired: false,
        component: Home,
        layout: LayoutDefault,
        order: 0,
        routeLabel: 'Home'
    },
    // Minha Conta
    {
        component: MinhaConta.MinhaConta,
        layout: LayoutAdmin,
        order: 0,
        routeLabel: 'Minha Conta'
    },
    {
        component: MinhaConta.MinhaContaAjuda,
        layout: LayoutAdmin,
        order: 1,
        routeLabel: 'Ajuda'
    }
];
