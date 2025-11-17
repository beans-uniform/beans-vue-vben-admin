import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SystemUserApi {
  export interface SystemUser {
    [key: string]: any;
    id: number;
    name: string;
    email: string;
    phone: string;
    status: 0 | 1;
  }
}

/**
 * 创建用户
 */
async function createUser(data: Recordable<any>) {
  return requestClient.post('/system/users', data);
}

/**
 * 获取用户详情
 */
async function getUserDetail(id: number) {
  return requestClient.get(`/system/users/${id}`);
}

/**
 * 获取用户列表
 */
async function getUserList(params: Recordable<any>) {
  return requestClient.get('/system/users', { params });
}

/**
 * 删除用户
 */
async function deleteUser(id: number) {
  return requestClient.delete(`/system/users/${id}`);
}

/**
 * 更新用户
 */
async function updateUser(id: number, data: Recordable<any>) {
  return requestClient.put(`/system/users/${id}`, data);
}

export { createUser, deleteUser, getUserDetail, getUserList, updateUser };
