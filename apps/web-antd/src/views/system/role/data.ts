import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemRoleApi } from '#/api';

import dayjs from 'dayjs';

import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.role.roleName'),
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: 1 },
          { label: $t('common.disabled'), value: 2 },
        ],
        optionType: 'button',
      },
      defaultValue: 1,
      fieldName: 'status',
      label: $t('common.status'),
    },
    {
      component: 'Input',
      fieldName: 'display_name',
      label: $t('system.role.displayName'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'parent_id',
      componentProps: {
        readonly: true,
        disabled: true,
        defaultValue: 0,
      },
      label: $t('system.role.parentRole'),
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        disabled: true,
        options: [
          { label: $t('common.yes'), value: true },
          { label: $t('common.no'), value: false },
        ],
        optionType: 'button',
      },
      defaultValue: false,
      fieldName: 'is_system',
      label: $t('system.role.isSystem'),
    },
    {
      component: 'Textarea',
      fieldName: 'description',
      label: $t('common.description'),
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
      fieldName: 'name',
      label: $t('system.role.roleName'),
    },
    // { component: 'Input', fieldName: 'id', label: $t('system.role.id') },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: $t('common.enabled'), value: 1 },
          { label: $t('common.disabled'), value: 2 },
        ],
      },
      fieldName: 'status',
      label: $t('common.status'),
    },
    {
      component: 'Input',
      fieldName: 'description',
      label: $t('common.description'),
    },
    {
      component: 'RangePicker',
      fieldName: 'created_at',
      label: $t('common.createTime'),
    },
  ];
}

export function getRoleTypeOptions() {
  return [
    // {
    //   color: 'processing',
    //   label: $t('system.menu.typeCatalog'),
    //   value: true,
    // },
    // { color: 'default', label: $t('system.menu.typeMenu'), value: 'menu' },
    // { color: 'error', label: $t('system.menu.typeButton'), value: 'button' },
    {
      color: 'success',
      label: $t('common.yes'),
      value: true,
    },
    { color: 'warning', label: $t('common.no'), value: false },
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
      field: 'name',
      title: $t('system.role.roleName'),
      width: 200,
    },
    {
      field: 'display_name',
      title: $t('system.role.displayName'),
      width: 200,
    },
    {
      field: 'is_system',
      title: $t('system.role.isSystem'),
      cellRender: {
        name: 'CellTag',
        options: getRoleTypeOptions(),
      },
      width: 60,
    },
    {
      field: 'level',
      title: $t('system.role.level'),
      width: 60,
    },
    {
      field: 'parent_id',
      title: $t('system.role.parentRole'),
      width: 60,
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
      field: 'description',
      minWidth: 100,
      title: $t('common.description'),
    },
    {
      field: 'created_at',
      title: $t('common.createTime'),
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
          {
            code: 'add_child',
            // warning: true,
            text: $t('system.role.addChild'),
          },
        ],
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('common.operation'),
      width: 200,
    },
  ];
}
