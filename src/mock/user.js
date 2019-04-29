import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getMessageInit = () => {
  let unreadList = []
  doCustomTimes(3, () => {
    unreadList.push(Mock.mock({
      title: Random.cword(10, 15),
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  let readedList = []
  doCustomTimes(4, () => {
    readedList.push(Mock.mock({
      title: Random.cword(10, 15),
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  let trashList = []
  doCustomTimes(2, () => {
    trashList.push(Mock.mock({
      title: Random.cword(10, 15),
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  return {
    unread: unreadList,
    readed: readedList,
    trash: trashList
  }
}

export const getContentByMsgId = () => {
  return `<divcourier new',='' monospace;font-weight:='' normal;font-size:='' 12px;line-height:='' 18px;white-space:='' pre;'=''><div>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-size: medium;'>这是消息内容，这个内容是使用<span style='color: rgb(255, 255, 255); background-color: rgb(28, 72, 127);'>富文本编辑器</span>编辑的，所以你可以看到一些<span style='text-decoration-line: underline; font-style: italic; color: rgb(194, 79, 74);'>格式</span></span></div><ol><li>你可以查看Mock返回的数据格式，和api请求的接口，来确定你的后端接口的开发</li><li>使用你的真实接口后，前端页面基本不需要修改即可满足基本需求</li><li>快来试试吧</li></ol><p>${Random.csentence(100, 200)}</p></divcourier>`
}

export const hasRead = () => {
  return true
}

export const removeReaded = () => {
  return true
}

export const restoreTrash = () => {
  return true
}

export const messageCount = () => {
  return 3
}

export const getUserList = req => {
  console.log(req)
  return {
    'retCode': '000',
    'retMessage': '操作成功',
    'result': {
      'records': [
        {
          'id': 1116177218695856205,
          'email': null,
          'password': '{bcrypt}$2a$10$BXlveiow9kG.3QMj2JWkauREEIR5teCoZ3skxAQ0kFhvsOv0iDGTq',
          'nickname': 'test05',
          'state': 1,
          'username': 'test05',
          'avatar': null,
          'phone': null,
          'sex': 1,
          'birthday': null,
          'address': null,
          'unitId': null,
          'groups': [
            {
              'id': 1,
              'name': null,
              'remark': null,
              'dataScope': null,
              'orgId': null,
              'resourceIds': null,
              'unitIds': null
            }
          ],
          'organization': null,
          'openid': null,
          'perms': null
        },
        {
          'id': 1116177156041343035,
          'email': null,
          'password': '{bcrypt}$2a$10$J6wFxCxyuPvJckUepmL2Setcn5bdZUPtAkZzhl/0fyxgWCvRXzYuG',
          'nickname': 'test04',
          'state': 1,
          'username': 'test04',
          'avatar': null,
          'phone': null,
          'sex': 1,
          'birthday': null,
          'address': null,
          'unitId': null,
          'groups': [
            {
              'id': 1,
              'name': null,
              'remark': null,
              'dataScope': null,
              'orgId': null,
              'resourceIds': null,
              'unitIds': null
            }
          ],
          'organization': null,
          'openid': null,
          'perms': null
        },
        {
          'id': 1116177107387416594,
          'email': null,
          'password': '{bcrypt}$2a$10$Tw0pRU697.W14scuGxgP0OwgmI5W.nrOE1NrdEbuKA/JK/rU4tE1.',
          'nickname': 'test03',
          'state': 1,
          'username': 'test03',
          'avatar': null,
          'phone': null,
          'sex': 1,
          'birthday': null,
          'address': null,
          'unitId': null,
          'groups': [
            {
              'id': 1,
              'name': null,
              'remark': null,
              'dataScope': null,
              'orgId': null,
              'resourceIds': null,
              'unitIds': null
            }
          ],
          'organization': null,
          'openid': null,
          'perms': null
        },
        {
          'id': 1116177043910819932,
          'email': null,
          'password': '{bcrypt}$2a$10$lUdWD4L.UQqOcDeXlUd5RuCtBxuNhbuLnHDXbdiMQ19fxKPLls62e',
          'nickname': 'test02',
          'state': 1,
          'username': 'test02',
          'avatar': null,
          'phone': null,
          'sex': 1,
          'birthday': null,
          'address': null,
          'unitId': null,
          'groups': [
            {
              'id': 1,
              'name': null,
              'remark': null,
              'dataScope': null,
              'orgId': null,
              'resourceIds': null,
              'unitIds': null
            }
          ],
          'organization': null,
          'openid': null,
          'perms': null
        },
        {
          'id': 1116176987501625435,
          'email': null,
          'password': '{bcrypt}$2a$10$49UGOaaWM7cFodE35LsaruMr4ZJ4VmR1JEDXhpLZnu486OwRbAsji',
          'nickname': 'test01',
          'state': 1,
          'username': 'test01',
          'avatar': null,
          'phone': null,
          'sex': 1,
          'birthday': null,
          'address': null,
          'unitId': null,
          'groups': [
            {
              'id': 1,
              'name': null,
              'remark': null,
              'dataScope': null,
              'orgId': null,
              'resourceIds': null,
              'unitIds': null
            }
          ],
          'organization': null,
          'openid': null,
          'perms': null
        },
        {
          'id': 1033287746405269505,
          'email': 'fss@139.com',
          'password': '$2a$06$qR6QkUD0PGHh9HXqp3TNL.2QjSldQovFK7cGTugT3aYhMaUdh.T/C',
          'nickname': 'fsfafa',
          'state': 1,
          'username': 'fss11',
          'avatar': 'http://img4.imgtn.bdimg.com/it/u=48557968,2396647998&fm=26&gp=0.jpg',
          'phone': '13800000592',
          'sex': 0,
          'birthday': '2018-08-26',
          'address': null,
          'unitId': '4',
          'groups': [
            {
              'id': 1,
              'name': null,
              'remark': null,
              'dataScope': null,
              'orgId': null,
              'resourceIds': null,
              'unitIds': null
            }
          ],
          'organization': null,
          'openid': null,
          'perms': null
        },
        {
          'id': 1029670122983260160,
          'email': '1111@143.com',
          'password': '$2a$06$JO5XpNSYjg7QQrN5fqB7YuaPkBgvJo.vpI0CfiFlHJ2egEAefVPJO',
          'nickname': 'fss',
          'state': 1,
          'username': 'fss',
          'avatar': null,
          'phone': null,
          'sex': 1,
          'birthday': '',
          'address': null,
          'unitId': '3',
          'groups': [
            {
              'id': 2,
              'name': null,
              'remark': null,
              'dataScope': null,
              'orgId': null,
              'resourceIds': null,
              'unitIds': null
            }
          ],
          'organization': null,
          'openid': null,
          'perms': null
        },
        {
          'id': 1028266440337129473,
          'email': '1',
          'password': '670b14728ad9902aecba32e22fa4f6bd',
          'nickname': 'hello',
          'state': 1,
          'username': 'funcas',
          'avatar': null,
          'phone': null,
          'sex': 0,
          'birthday': null,
          'address': null,
          'unitId': '2',
          'groups': [
            {
              'id': 3,
              'name': null,
              'remark': null,
              'dataScope': null,
              'orgId': null,
              'resourceIds': null,
              'unitIds': null
            }
          ],
          'organization': null,
          'openid': null,
          'perms': null
        },
        {
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
          'groups': [
            {
              'id': 3,
              'name': null,
              'remark': null,
              'dataScope': null,
              'orgId': null,
              'resourceIds': null,
              'unitIds': null
            }
          ],
          'organization': null,
          'openid': null,
          'perms': null
        },
        {
          'id': 4,
          'email': 'user@163.com',
          'password': '$2a$06$VC7xgxaEhyuHU7DvYbD5iepk0oJpFBpxkLJS96b1zAj7xlWTTePb2',
          'nickname': '普通用户',
          'state': 1,
          'username': 'user',
          'avatar': null,
          'phone': null,
          'sex': 0,
          'birthday': null,
          'address': null,
          'unitId': '2',
          'groups': [
            {
              'id': 2,
              'name': null,
              'remark': null,
              'dataScope': null,
              'orgId': null,
              'resourceIds': null,
              'unitIds': null
            }
          ],
          'organization': null,
          'openid': null,
          'perms': null
        }
      ],
      'total': 11,
      'size': 10,
      'current': 1,
      'pages': 2
    }
  }
}
