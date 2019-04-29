import axios from '@/libs/api.request'

export const saveGroup = (data) => {
  return axios.request({
    url: '/api/sys/group',
    method: 'post',
    data
  })
}

export const getGroups = (params) => {
  return axios.request({
    url: '/api/sys/groups',
    method: 'get',
    params
  })
}

export const delGroup = (id) => {
  return axios.request({
    url: `/api/sys/group/${id}`,
    method: 'delete'
  })
}
