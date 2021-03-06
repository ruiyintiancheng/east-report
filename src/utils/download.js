/*
 * @Author: lk
 * @Date: 2019-02-01 17:37:07
 * @Last Modified by: lk
 * @Last Modified time: 2019-09-02 17:57:36
 */
import { baseDownLoad } from '@/api/base'
export function downloadFile(response) {
  if (!response) {
    return
  }
  let name = response['headers']['content-disposition'].split('filename=')[1]
  name = decodeURI(name)
  const blob = new Blob([response.data])
  const url = window.URL.createObjectURL(new Blob([response.data]))
  if ('download' in document.createElement('a')) {
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', name)

    document.body.appendChild(link)
    link.click()
  } else {
    navigator.msSaveBlob(blob, name)
  }
}

export function download(url, param, callback, failCallback) {
  baseDownLoad(url, param).then(response => {
    if (!response) {
      return
    }
    let name = response['headers']['content-disposition'].split('filename=')[1]
    name = decodeURI(name)
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(new Blob([response.data]))
    if ('download' in document.createElement('a')) {
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', name)

      document.body.appendChild(link)
      link.click()
    } else {
      navigator.msSaveBlob(blob, name)
    }
    callback && callback()
  }).catch(() => {
    failCallback && failCallback()
  })
}

export function basicDownload(url, param) {
  return new Promise((resolve, reject) => {
    baseDownLoad(url, param).then(response => {
      if (!response) {
        reject()
      }
      let name = response['headers']['content-disposition'].split('filename=')[1]
      name = decodeURI(name)
      const blob = new Blob([response.data])
      const url = window.URL.createObjectURL(new Blob([response.data]))
      if ('download' in document.createElement('a')) {
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', name)
        document.body.appendChild(link)
        link.click()
      } else {
        navigator.msSaveBlob(blob, name)
      }
      resolve()
    }).catch(() => {
      reject()
    })
  })
}
