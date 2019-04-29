import axios from '@/libs/api.request'

export const getJobList = (params) => {
  return axios.request({
    url: '/api/sys/jobs',
    method: 'get',
    params
  })
}

export const saveJob = (data) => {
  return axios.request({
    url: '/api/sys/job',
    method: 'post',
    data
  })
}

export const removeJob = (id) => {
  return axios.request({
    url: `/api/sys/job/${id}`,
    method: 'delete'
  })
}

export const startJob = (id) => {
  return axios.request({
    url: `/api/sys/job-start/${id}`,
    method: 'get'
  })
}

export const pauseJob = (id) => {
  return axios.request({
    url: `/api/sys/job-pause/${id}`,
    method: 'get'
  })
}

export const resumeJob = (id) => {
  return axios.request({
    url: `/api/sys/job-resume/${id}`,
    method: 'get'
  })
}

export const stopJob = (id) => {
  return axios.request({
    url: `/api/sys/job-stop/${id}`,
    method: 'get'
  })
}
