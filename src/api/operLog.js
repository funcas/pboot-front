import axios from '@/libs/api.request'

export const getOperLogs = (params) => {
  return axios.request({
    url: '/api/sys/audits',
    method: 'get',
    params
  })
}
