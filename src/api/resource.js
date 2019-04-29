import axios from '@/libs/api.request'

export const getMenuList = (param) => {
  return axios.request({
    method: 'get',
    url: '/api/sys/resources',
    param
  })
}
/**
 * 保存或更新菜单
 * @param entity
 */
export const saveMenu = (data) => {
  return axios.request({
    method: 'post',
    url: '/api/sys/resource',
    data
  })
}

export const getMenuByGroupId = (id) => {
  return axios.request({
    method: 'get',
    url: `/api/sys/resource/group/${id}`
  })
}
