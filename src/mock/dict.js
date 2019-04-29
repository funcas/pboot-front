
export const getDictCategory = req => {
  return {
    'retCode': '000',
    'retMessage': '操作成功',
    'result': {
      'records': [
        {
          'id': '3',
          'code': 'SYSTEM_VAR',
          'name': '系统类型',
          'remark': '系统类型',
          'removeAble': false,
          'editAble': false
        },
        {
          'id': '2',
          'code': 'RESOURCE_TYPE',
          'name': '资源类型',
          'remark': null,
          'removeAble': false,
          'editAble': false
        },
        {
          'id': '1',
          'code': 'STATE',
          'name': '状态',
          'remark': null,
          'removeAble': false,
          'editAble': false
        }
      ],
      'total': 3,
      'size': 10,
      'current': 1,
      'pages': 1
    }
  }
}

export const getDicts = req => {
  return {
    'retCode': '000',
    'retMessage': '操作成功',
    'result': {
      'records': [
        {
          'id': '12',
          'name': '管理员角色ID',
          'code': 'SYSTEM_VAR_ROLE_ID',
          'remark': '',
          'type': 'LONG',
          'value': '3',
          'fkCategoryId': '3',
          'categoryName': '系统类型'
        },
        {
          'id': '11',
          'name': '安全类型',
          'code': 'RESOURCE_TYPE_SECURITY',
          'remark': '',
          'type': 'INTEGER',
          'value': '2',
          'fkCategoryId': '2',
          'categoryName': '资源类型'
        },
        {
          'id': '10',
          'name': '导航类型',
          'code': 'RESOURCE_TYPE_NAV',
          'remark': '',
          'type': 'INTEGER',
          'value': '1',
          'fkCategoryId': '2',
          'categoryName': '资源类型'
        },
        {
          'id': '3',
          'name': '删除',
          'code': 'STATE_DELETE',
          'remark': '',
          'type': 'INTEGER',
          'value': '3',
          'fkCategoryId': '1',
          'categoryName': '状态'
        },
        {
          'id': '2',
          'name': '禁用',
          'code': 'STATE_DISABLED',
          'remark': '',
          'type': 'INTEGER',
          'value': '2',
          'fkCategoryId': '1',
          'categoryName': '状态'
        },
        {
          'id': '1',
          'name': '启用',
          'code': 'STATE_ENABLE',
          'remark': '',
          'type': 'INTEGER',
          'value': '1',
          'fkCategoryId': '1',
          'categoryName': '状态'
        }
      ],
      'total': 6,
      'size': 10,
      'current': 1,
      'pages': 1
    }
  }
}
