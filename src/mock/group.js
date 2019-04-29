// import Mock from 'mockjs'

export const getRoleList = req => {
  return {
    'retCode': '000',
    'retMessage': '操作成功',
    'result': {
      'records': [
        {
          'id': 3,
          'name': '超级管理员',
          'remark': '超级管理员',
          'dataScope': 0,
          'orgId': '0',
          'resourceIds': null,
          'unitIds': null
        },
        {
          'id': 2,
          'name': '运维人员',
          'remark': '',
          'dataScope': 3,
          'orgId': '0',
          'resourceIds': null,
          'unitIds': null
        },
        {
          'id': 1,
          'name': '普通用户',
          'remark': '',
          'dataScope': 9,
          'orgId': '0',
          'resourceIds': null,
          'unitIds': null
        }
      ],
      'total': 3,
      'size': 10,
      'current': 1,
      'pages': 1
    }
  }
}
