import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

// "id": 37,
//                 "path": "/api/v1/system/logs/logins",
//                 "method": "GET",
//                 "group": "log",
//                 "status": 1,
//                 "description": "List login logs",
//                 "created_at": "2025-11-15T08:00:55.422693Z",
//                 "updated_at": "2025-11-15T08:00:55.422693Z"

export namespace SystemApiApi {
  export interface SystemApi {
    [key: string]: any;
    id: number;
    name: string;
    path: string;
    method: string;
    group: string;
    status: 1 | 2;
    description: string;
    created_at: string;
    updated_at: string;
  }
}

/**
 * 获取接口列表
 */
async function getApiList(params: Recordable<any>) {
  return requestClient.get('/system/apis', { params });
}

/**
 * 删除接口
 */
async function deleteApi(id: number) {
  return requestClient.delete(`/system/apis/${id}`);
}

/**
 * 创建接口
 */
async function createApi(data: Recordable<any>) {
  return requestClient.post('/system/apis', data);
}

/**
 * 更新接口
 */
async function updateApi(id: number, data: Recordable<any>) {
  return requestClient.put(`/system/apis/${id}`, data);
}

export { createApi, deleteApi, getApiList, updateApi };
