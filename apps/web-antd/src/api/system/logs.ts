import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SystemLogsApi {
  export interface SystemOperationLog {
    [key: string]: any;
    id: string;
    user_id: number;
    username: string;
    method: string;
    path: string;
    ip: string;
    user_agent: string;
    request_body: string;
    response_body: string;
    status_code: number;
    error_message: string;
    latency_ms: number;
    created_at: string;
  }
}

/**
 * 获取操作日志列表
 */
async function getOperationLogsList(params: Recordable<any>) {
  return requestClient.get('/system/logs/operations', { params });
}

/**
 * 删除操作日志
 */
async function deleteOperationLog(id: string) {
  return requestClient.delete(`/system/logs/operations/${id}`);
}

export { deleteOperationLog, getOperationLogsList };
