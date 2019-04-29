import axios from '@/libs/api.request'
import qs from 'qs'

export const login = ({ userName, password }) => {
  const data = {
    grant_type: 'password',
    username: userName,
    password: password,
    client_id: 'app',
    client_secret: 'app'
  }
  return axios.request({
    url: '/api/oauth/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data),
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: '/api/sys/userinfo',
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/api/_logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const getUserList = (params) => {
  return axios.request({
    url: '/api/sys/users',
    method: 'get',
    params
  })
}

export const saveUser = (data) => {
  return axios.request({
    url: '/api/sys/user',
    method: 'post',
    data
  })
}

export const delUser = (data) => {
  return axios.request({
    url: `/api/sys/user/${data}`,
    method: 'delete'
  })
}

export const delUserBatch = (data) => {
  return axios.request({
    url: '/api/sys/user/batch',
    method: 'delete',
    data
  })
}

export const getRoleList = (params) => {
  return axios.request({
    url: '/api/sys/groups',
    method: 'get',
    params
  })
}

export const getTicket = () => {
  console.log(1)
  return axios.request({
    url: '/api/wechat/ticket',
    method: 'get'
  })
}

export const qrLogin = (ticket, timestamp) => {
  return axios.request({
    url: `/api/wechat/qrlogin?ticket=${ticket}&_t=${timestamp}`,
    method: 'get'
  })
}
