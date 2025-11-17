import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemRoleApi } from '#/api';

import dayjs from 'dayjs';

import { z } from '#/adapter/form';
import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'username',
      label: $t('common.username'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'nickname',
      label: $t('common.nickname'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'phone',
      label: $t('common.phone'),
      rules: z.string().regex(/^1[3-9]\d{9}$/, $t('common.invalid.phone')),
    },
    {
      component: 'Input',
      fieldName: 'email',
      label: $t('common.email'),
      rules: z.string().email($t('common.invalid.email')),
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.yes'), value: 1 },
          { label: $t('common.no'), value: 2 },
        ],
        optionType: 'button',
      },
      defaultValue: false,
      fieldName: 'status',
      label: $t('common.status'),
    },
    {
      component: 'Input',
      fieldName: 'avatar',
      label: $t('common.avatar'),
    },
    // {
    //   component: 'Input',
    //   fieldName: 'permissions',
    //   formItemClass: 'items-start',
    //   label: $t('system.role.setPermissions'),
    //   modelPropName: 'modelValue',
    // },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'username',
      label: $t('common.username'),
    },
    {
      component: 'Input',
      fieldName: 'nickname',
      label: $t('common.nickname'),
    },
    {
      component: 'Input',
      fieldName: 'phone',
      label: $t('common.phone'),
    },
    {
      component: 'Input',
      fieldName: 'email',
      label: $t('common.email'),
    },
    {
      component: 'RangePicker',
      fieldName: 'created_at',
      label: $t('common.createTime'),
    },
  ];
}

export function useColumns<T = SystemRoleApi.SystemRole>(
  onActionClick: OnActionClickFn<T>,
  onStatusChange?: (newStatus: any, row: T) => PromiseLike<boolean | undefined>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'id',
      title: $t('common.id'),
      width: 60,
    },
    {
      field: 'username',
      title: $t('common.username'),
      width: 200,
    },
    {
      field: 'nickname',
      title: $t('common.nickname'),
      width: 200,
    },
    {
      field: 'phone',
      title: $t('common.phone'),
      width: 100,
    },
    {
      field: 'email',
      title: $t('common.email'),
      width: 100,
    },
    {
      cellRender: {
        attrs: { beforeChange: onStatusChange },
        name: onStatusChange ? 'CellSwitch' : 'CellTag',
        props: {
          checkedValue: 1,
          unCheckedValue: 2,
        },
      },
      field: 'status',
      title: $t('common.status'),
      width: 100,
    },
    {
      field: 'created_at',
      title: $t('system.role.createTime'),
      formatter: ({ row }) => {
        if (row.created_at) {
          return dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss');
        }
        return '';
      },
      width: 200,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: $t('system.role.name'),
          onClick: onActionClick,
        },
        options: [
          {
            code: 'edit',
            text: $t('common.edit'),
          },
          {
            code: 'delete',
            text: $t('common.delete'),
          },
        ],
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('common.operation'),
      width: 160,
    },
  ];
}
