import axios from '@/libs/api.request'

export const getUnitByParentId = (pid) => {
  return axios.request({
    url: `/api/sys/unit/tree/${pid}`,
    method: 'get'
  })
}

export const getUnits = () => {
  return axios.request({
    url: '/api/sys/units',
    method: 'get'
  })
}

export const saveUnit = (data) => {
  return axios.request({
    url: '/api/sys/unit',
    method: 'post',
    data
  })
}

export const removeUnit = (id) => {
  return axios.request({
    url: `/api/sys/unit/${id}`,
    method: 'delete'
  })
}

export const getUnitByGroupId = (id) => {
  return axios.request({
    method: 'get',
    url: `/api/sys/unit/ds?groupId=${id}`
  })
}
