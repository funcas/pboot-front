// import { getParams } from '@/libs/util'
// const USER_MAP = {
//   super_admin: {
//     name: 'super_admin',
//     user_id: '1',
//     access: ['super_admin', 'admin'],
//     token: 'super_admin',
//     avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
//   },
//   admin: {
//     name: 'admin',
//     user_id: '2',
//     access: ['admin'],
//     token: 'admin',
//     avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
//   }
// }

export const login = req => {
  return {
    'access_token': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTg0OTQxMDQsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsidXNlcjpsaXN0IiwiZ3JvdXA6ZWRpdCIsImdyb3VwOmRlbGV0ZSIsImpvYjpyZXNtdWUiLCJhdWRpdDpsaXN0IiwidW5pdDplZGl0IiwiZGljdGlvbmFyeS1jYXRlZ29yeTpzYXZlIiwiam9iOmxpc3QiLCJqb2I6cGF1c2UiLCJ1bml0Omxpc3QiLCJyZXNvdXJjZTpsaXN0IiwiZ3JvdXA6bGlzdCIsImRpY3Rpb25hcnktY2F0ZWdvcnk6ZWRpdCIsInVuaXQ6ZGVsZXRlIiwiZGF0YS1kaWN0aW9uYXJ5Omxpc3QiLCJ1c2VyOmRlbGV0ZSIsInJlc291cmNlOmVkaXQiLCJyZXNvdXJjZTpkZWxldGUiLCJkaWN0aW9uYXJ5LWNhdGVnb3J5OmRlbGV0ZSIsImpvYjpzdG9wIiwiZGljdGlvbmFyeS1jYXRlZ29yeTpsaXN0IiwicmVzb3VyY2U6c2F2ZSIsImRhdGEtZGljdGlvbmFyeTplZGl0IiwidXNlcjplZGl0IiwiZGF0YS1kaWN0aW9uYXJ5OmRlbGV0ZSIsImpvYjpzdGFydCIsInVuaXQ6c2F2ZSIsImRhdGEtZGljdGlvbmFyeTpzYXZlIiwidXNlcjpzYXZlIiwiZ3JvdXA6c2F2ZSJdLCJqdGkiOiJlNzAxNmRkMS01NjVhLTRlNmMtYTZlYi05YWE1NTE2ODkzMzkiLCJjbGllbnRfaWQiOiJhcHAiLCJzY29wZSI6WyJhcHAiXX0.LNh4obB97dAhLcJ8I-E_g-t5YwUsyJuCuq3PIptu4yLLxL5bCYvW4RY7bpSVQL5o-Or3JSB58LT0_xlbbb-fYB9-IMy45FIUx5Td8oYh2Mo_lSfZZuAv6aLS0K84hpaMDAQj6oJreLltGUCDz_2e8sTCGFmnbl7ck9w7xLaGYErhgcAmgVuwWHIL2YQ2cq-TIzpK0Wa3XHg5ydUKOXPTrz1nbLI9nBUGEBjJBDt7i2nDYsiAAG5qK9f_V_7jp9wW0t4xtnE5uTv2MBPYRdgwL4_e99JMEvPwIZUdLOzYbzqABpKpq2SzQml0nTdN6Bk48DwdPc92qxly8Q1J3E0cFQ',
    'token_type': 'bearer',
    'refresh_token': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFwcCJdLCJhdGkiOiJlNzAxNmRkMS01NjVhLTRlNmMtYTZlYi05YWE1NTE2ODkzMzkiLCJleHAiOjE1NTY1MDY5MDQsImF1dGhvcml0aWVzIjpbInVzZXI6bGlzdCIsImdyb3VwOmVkaXQiLCJncm91cDpkZWxldGUiLCJqb2I6cmVzbXVlIiwiYXVkaXQ6bGlzdCIsInVuaXQ6ZWRpdCIsImRpY3Rpb25hcnktY2F0ZWdvcnk6c2F2ZSIsImpvYjpsaXN0Iiwiam9iOnBhdXNlIiwidW5pdDpsaXN0IiwicmVzb3VyY2U6bGlzdCIsImdyb3VwOmxpc3QiLCJkaWN0aW9uYXJ5LWNhdGVnb3J5OmVkaXQiLCJ1bml0OmRlbGV0ZSIsImRhdGEtZGljdGlvbmFyeTpsaXN0IiwidXNlcjpkZWxldGUiLCJyZXNvdXJjZTplZGl0IiwicmVzb3VyY2U6ZGVsZXRlIiwiZGljdGlvbmFyeS1jYXRlZ29yeTpkZWxldGUiLCJqb2I6c3RvcCIsImRpY3Rpb25hcnktY2F0ZWdvcnk6bGlzdCIsInJlc291cmNlOnNhdmUiLCJkYXRhLWRpY3Rpb25hcnk6ZWRpdCIsInVzZXI6ZWRpdCIsImRhdGEtZGljdGlvbmFyeTpkZWxldGUiLCJqb2I6c3RhcnQiLCJ1bml0OnNhdmUiLCJkYXRhLWRpY3Rpb25hcnk6c2F2ZSIsInVzZXI6c2F2ZSIsImdyb3VwOnNhdmUiXSwianRpIjoiNWFiNTFlYTgtNjMwNi00NGIzLWI3YjctNWM5YTEzMmJhM2ZlIiwiY2xpZW50X2lkIjoiYXBwIn0.DCToZTUmAMAmcBjn9PtLGTrDvcM30Pz15yXy2M-hc64cYOgnQYrKuHcnw0M_ICtTteviiv5tBxOlVXNfg9j-mfw0IbHJ541HEai75K-g2liNo_XR3Bb5jT8-SlOJcpgR7TtmVJZ-TSTnKl2XDAq6vO4lyvvbCg-p8lLsQ0kw9mnmkwSmpLGH_2s-7mxfY6ao_R2VzIOqud9FZhgIO067L9ZvLMuHrAV0kqaZDuq1Za9EBfeV0w9MkoKDP_B79OPYLCbW1415LsWk8G_9pfncW2EYNAhIoFzc9Mx5OXJ46icXdxIeLVXeure_L_jTvHGzgzsQypskSFm7I7zNXKrhFw',
    'expires_in': 2591999,
    'scope': 'app',
    'jti': 'e7016dd1-565a-4e6c-a6eb-9aa551689339'
  }
}

export const getUserInfo = req => {
  return {
    'retCode': '000',
    'retMessage': '操作成功',
    'result': {
      'id': 5,
      'email': 'administrator@163.com',
      'password': '{bcrypt}$2a$10$KmxVSv6GE5OIhCZpljnqKe1pe02fIUHSK/7PlqOQIlTw/RKoo/gOG',
      'nickname': '超级管理员',
      'state': 1,
      'username': 'admin',
      'avatar': 'http://image.biaobaiju.com/uploads/20180918/15/1537256494-ZnSKMzEoBI.jpeg',
      'phone': null,
      'sex': 0,
      'birthday': null,
      'address': null,
      'unitId': '1',
      'groups': null,
      'organization': null,
      'openid': null,
      'perms': [
        'resource:list',
        'user:list',
        'job:list',
        'group:list',
        'dictionary-category:list',
        'unit:list',
        'unit:edit',
        'unit:save',
        'user:save',
        'unit:delete',
        'audit:list',
        'user:delete',
        'user:edit',
        'group:save',
        'group:edit',
        'group:delete',
        'resource:save',
        'resource:edit',
        'resource:delete',
        'data-dictionary:save',
        'data-dictionary:edit',
        'data-dictionary:delete',
        'dictionary-category:save',
        'dictionary-category:edit',
        'dictionary-category:delete',
        'job:start',
        'job:stop',
        'job:pause',
        'job:resmue',
        'data-dictionary:list'
      ]
    }
  }
}

export const logout = req => {
  return null
}
