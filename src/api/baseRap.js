/*
 * @Author: lk
 * @Date: 2019-02-01 17:35:14
 * @Last Modified by: wk
 * @Last Modified time: 2020-05-20 15:25:32
 */

import request from '@/utils/requestRap'
import { validateParams } from '@/utils/validate'
import { validateInputs } from '@/utils/index'

export function getMenu() {
  return request({
    url: '/basic/function/getmenu',
    method: 'post'
  })
}

export function baseSearchList(query, url) {
  return request({
    url: url,
    method: 'post',
    data: JSON.stringify(validateParams(query))
  })
}

export function baseRequest(url, query) {
  return request({
    url: url,
    method: 'post',
    data: JSON.stringify(query ? validateInputs(query) : query)
  })
}

export function baseSearch(url, query) {
  return request({
    url: url,
    method: 'post',
    data: JSON.stringify(validateParams(query))
  })
}

export function baseUpload(url, query) {
  return request({
    url: url,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: query
  })
}

export function baseDownLoad(url, query) {
  return request({
    url: url,
    method: 'post',
    data: JSON.stringify(query ? validateInputs(query) : query),
    responseType: 'blob'
  })
}
