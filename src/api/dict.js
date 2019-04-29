import axios from '@/libs/api.request'

export const getDictCategory = (params) => {
  return axios.request({
    url: '/api/sys/dict-categories',
    method: 'get',
    params
  })
}

export const saveDictCategory = (data) => {
  return axios.request({
    url: '/api/sys/dict-category',
    method: 'post',
    data
  })
}

export const delDictCategory = (id) => {
  return axios.request({
    url: `/api/sys/dict-cateogyr/{id}`,
    method: 'delete'
  })
}

export const getDicts = (params) => {
  return axios.request({
    url: '/api/sys/dicts',
    method: 'get',
    params
  })
}

export const saveDict = (data) => {
  return axios.request({
    url: '/api/sys/dict',
    method: 'post',
    data
  })
}

export const fetchFieldTypes = () => {
  return axios.request({
    url: '/api/sys/field-types',
    method: 'get'
  })
}
