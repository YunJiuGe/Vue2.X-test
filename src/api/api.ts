import { Request } from './request'

export function post (url: string, data: any) {
  return Request.axiosInstance({
    url: url,
    method: 'post',
    data: data
  })
}

export function get (url: string, data: any) {
  return Request.axiosInstance({
    url: url,
    method: 'get',
    data: data
  })
}

export function downFile (url: string, data: any) {
  return Request.axiosInstance({
    url: url,
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
