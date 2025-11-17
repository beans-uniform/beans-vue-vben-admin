import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemLogsApi } from '#/api';

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
          { label: $t('common.disabled'), value: 0 },
        ],
        optionType: 'button',
      },
      defaultValue: 1,
      fieldName: 'status',
      label: $t('system.role.status'),
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: $t('system.role.remark'),
    },
    {
      component: 'Input',
      fieldName: 'permissions',
      formItemClass: 'items-start',
      label: $t('system.role.setPermissions'),
      modelPropName: 'modelValue',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'method',
      label: $t('system.logs.method'),
    },
    {
      component: 'Input',
      fieldName: 'path',
      label: $t('system.logs.path'),
    },
    {
      component: 'Input',
      fieldName: 'status_code',
      label: $t('system.logs.status_code'),
    },
    {
      component: 'Input',
      fieldName: 'ip',
      label: $t('system.logs.ip'),
    },
    // {
    //   component: 'Select',
    //   componentProps: {
    //     allowClear: true,
    //     options: [
    //       { label: $t('common.enabled'), value: 1 },
    //       { label: $t('common.disabled'), value: 0 },
    //     ],
    //   },
    //   fieldName: 'status',
    //   label: $t('system.role.status'),
    // },
    // {
    //   component: 'Input',
    //   fieldName: 'remark',
    //   label: $t('system.role.remark'),
    // },
    // {
    //   component: 'RangePicker',
    //   fieldName: 'createTime',
    //   label: $t('system.role.createTime'),
    // },
  ];
}

export function useColumns<T = SystemLogsApi.SystemOperationLog>(
  onActionClick: OnActionClickFn<T>,
  // onStatusChange?: (newStatus: any, row: T) => PromiseLike<boolean | undefined>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'username',
      title: $t('system.logs.username'),
      width: 100,
    },
    {
      field: 'created_at',
      title: $t('system.logs.created_at'),
      formatter: (row: any) => {
        return dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss');
      },
      width: 200,
    },
    {
      field: 'status_code',
      title: $t('system.logs.status_code'),
      width: 80,
    },
    {
      field: 'method',
      title: $t('system.logs.method'),
      width: 60,
    },
    {
      field: 'path',
      title: $t('system.logs.path'),
      width: 200,
    },
    {
      field: 'latency_ms',
      title: $t('system.logs.latency_ms'),
      width: 80,
    },
    {
      field: 'ip',
      title: $t('system.logs.ip'),
      width: 200,
    },

    // {
    //   field: 'status_code',
    //   title: $t('system.logs.status_code'),
    //   width: 200,
    // },
    // {
    //   field: 'id',
    //   title: $t('system.role.id'),
    //   width: 200,
    // },
    // {
    //   cellRender: {
    //     attrs: { beforeChange: onStatusChange },
    //     name: onStatusChange ? 'CellSwitch' : 'CellTag',
    //   },
    //   field: 'status',
    //   title: $t('system.role.status'),
    //   width: 100,
    // },
    // {
    //   field: 'remark',
    //   minWidth: 100,
    //   title: $t('system.role.remark'),
    // },
    // {
    //   field: 'createTime',
    //   title: $t('system.role.createTime'),
    //   width: 200,
    // },
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
