import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemApiApi } from '#/api/system/api';

import dayjs from 'dayjs';

import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.api.apiName'),
      componentProps: {
        readonly: false,
      },
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: 'GET', value: 'GET' },
          { label: 'POST', value: 'POST' },
          { label: 'PUT', value: 'PUT' },
          { label: 'DELETE', value: 'DELETE' },
        ],
      },
      fieldName: 'method',
      label: $t('system.api.method'),
    },
    {
      component: 'Input',
      // componentProps: {
      //   buttonStyle: 'solid',
      //   options: [
      //     { label: $t('common.enabled'), value: 1 },
      //     { label: $t('common.disabled'), value: 0 },
      //   ],
      //   optionType: 'button',
      // },
      // defaultValue: 1,
      fieldName: 'group',
      label: $t('system.api.group'),
    },
    {
      component: 'Input',
      fieldName: 'path',
      formItemClass: 'items-start',
      label: $t('system.api.path'),
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
      label: $t('system.api.status'),
    },
    {
      component: 'Textarea',
      fieldName: 'description',
      label: $t('system.api.description'),
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'path',
      label: $t('system.api.path'),
      componentProps: {
        allowClear: true,
      },
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: 'GET', value: 'GET' },
          { label: 'POST', value: 'POST' },
          { label: 'PUT', value: 'PUT' },
          { label: 'DELETE', value: 'DELETE' },
        ],
      },
      fieldName: 'method',
      label: $t('system.api.method'),
    },
    {
      component: 'Input',
      componentProps: {
        allowClear: true,
      },
      fieldName: 'group',
      label: $t('system.api.group'),
    },
    {
      component: 'RangePicker',
      fieldName: 'created_at',
      label: $t('system.api.created_at'),
    },
  ];
}

export function useColumns<T = SystemApiApi.SystemApi>(
  onActionClick: OnActionClickFn<T>,
  onStatusChange?: (newStatus: any, row: T) => PromiseLike<boolean | undefined>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'id',
      title: $t('system.api.id'),
      width: 60,
    },
    {
      field: 'name',
      title: $t('system.api.apiName'),
      width: 140,
    },
    {
      field: 'path',
      title: $t('system.api.path'),
      width: 300,
    },
    {
      field: 'method',
      title: $t('system.api.method'),
      width: 80,
    },
    {
      field: 'group',
      title: $t('system.api.group'),
      width: 80,
    },
    {
      field: 'description',
      title: $t('system.api.description'),
      width: 200,
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
      title: $t('system.role.status'),
      width: 100,
    },
    {
      field: 'created_at',
      title: $t('system.api.created_at'),
      formatter: ({ row }) => {
        return dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss');
      },
      width: 180,
    },
    {
      field: 'updated_at',
      title: $t('system.api.updated_at'),
      formatter: ({ row }) => {
        return dayjs(row.updated_at).format('YYYY-MM-DD HH:mm:ss');
      },
      width: 180,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: $t('system.role.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.role.operation'),
      width: 130,
    },
  ];
}
