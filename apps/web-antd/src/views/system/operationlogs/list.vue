<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { SystemLogsApi } from '#/api/system/logs';

import { Page, useVbenDrawer } from '@vben/common-ui';
// import { Plus } from '@vben/icons';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteOperationLog, getOperationLogsList } from '#/api/system/logs';
import { $t } from '#/locales';

import { useColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    fieldMappingTime: [['createTime', ['startTime', 'endTime']]],
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getOperationLogsList({
            page: page.currentPage,
            page_size: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },

    toolbarConfig: {
      custom: true,
      export: false,
      refresh: true,
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<SystemLogsApi.SystemOperationLog>,
});

function onActionClick(
  e: OnActionClickParams<SystemLogsApi.SystemOperationLog>,
) {
  switch (e.code) {
    case 'delete': {
      onDelete(e.row);
      break;
    }
    case 'edit': {
      onEdit(e.row);
      break;
    }
  }
}

/**
 * 将Modal.confirm封装为promise，方便在异步函数中调用。
 * @param content 提示内容
 * @param title 提示标题
 */
// function confirm(content: string, title: string) {
//   return Modal.confirm({
//     title,
//     content,
//     okText: '确定',
//     cancelText: '取消',
//     type: 'warning',
//   });
// }

/**
 * 状态开关即将改变
 * @param newStatus 期望改变的状态值
 * @param row 行数据
 * @returns 返回false则中止改变，返回其他值（undefined、true）则允许改变
 */
// async function onStatusChange(
//   newStatus: number,
//   row: SystemLogsApi.SystemOperationLog,
// ) {
//   const status: Recordable<string> = {
//     0: '禁用',
//     1: '启用',
//   };
//   try {
//     await confirm(
//       `你要将${row.name}的状态切换为 【${status[newStatus.toString()]}】 吗？`,
//       `切换状态`,
//     );
//     // await updateRole(row.id, { status: newStatus });
//     return true;
//   } catch {
//     return false;
//   }
// }

function onEdit(row: SystemLogsApi.SystemOperationLog) {
  formDrawerApi.setData(row).open();
}

function onDelete(row: SystemLogsApi.SystemOperationLog) {
  const hideLoading = message.loading(
    $t('ui.actionMessage.deleting', [row.name]),
    0,
  );
  deleteOperationLog(row.id)
    .then(() => {
      hideLoading();
      message.success($t('ui.actionMessage.deleteSuccess', [row.name]));
      onRefresh();
    })
    .catch(() => {
      hideLoading();
    });
}

function onRefresh() {
  gridApi.query();
}
</script>
<template>
  <Page auto-content-height>
    <FormDrawer @success="onRefresh" />
    <Grid :table-title="$t('system.logs.list')">
      <template #toolbar-tools>
        <!-- <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('system.role.name')]) }}
        </Button> -->
      </template>
    </Grid>
  </Page>
</template>
