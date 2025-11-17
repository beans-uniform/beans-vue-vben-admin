import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'mdi:account-group',
      order: -1,
      title: $t('system.title'),
    },
    name: 'System Management',
    path: '/system',
    children: [
      {
        name: 'Role Management',
        path: '/system/role',
        component: () => import('#/views/system/role/list.vue'),
        meta: {
          icon: 'mdi:account-group',
          title: $t('system.role.title'),
          authority: ['super_admin', 'manager'],
        },
      },
      {
        name: 'User Management',
        path: '/system/user',
        component: () => import('#/views/system/user/list.vue'),
        meta: {
          icon: 'mdi:account-group',
          title: $t('system.user.title'),
          authority: ['super_admin', 'manager'],
        },
      },
      {
        name: 'Menu Management',
        path: '/system/menu',
        component: () => import('#/views/system/menu/list.vue'),
        meta: {
          icon: 'mdi:menu',
          title: $t('system.menu.title'),
          authority: ['super_admin', 'manager'],
        },
      },
      {
        name: 'Api Management',
        path: '/system/api',
        component: () => import('#/views/system/api/list.vue'),
        meta: {
          icon: 'mdi:api',
          title: $t('system.api.title'),
          authority: ['super_admin', 'manager'],
        },
      },
      {
        name: 'Operation Logs',
        path: '/system/operationlogs',
        component: () => import('#/views/system/operationlogs/list.vue'),
        meta: {
          icon: 'mdi:history',
          title: $t('system.operationlogs.title'),
          authority: ['super_admin', 'manager'],
        },
      },
    ],
  },
];

export default routes;
