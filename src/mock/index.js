import Mock from 'mockjs'
// import { login, logout, getUserInfo } from './login'
import { getTableData, getDragList, uploadImage, getOrgData, getTreeSelectData } from './data'
import { getMessageInit, getContentByMsgId, hasRead, removeReaded, restoreTrash, messageCount } from './user'
// import { getRoleList } from './group'
// import { getResources } from './resources'
// import { getUnitTree } from './unit'
// import { getDictCategory, getDicts } from './dict'
// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})

// 登录相关和获取用户信息
// Mock.mock(/\/uaa\/sys\/login/, login)
// Mock.mock(/\/uaa\/sys\/user-info/, getUserInfo)
// Mock.mock(/\/uaa\/sys\/logout/, logout)
Mock.mock(/\/get_table_data/, getTableData)
Mock.mock(/\/get_drag_list/, getDragList)
Mock.mock(/\/save_error_logger/, 'success')
Mock.mock(/\/image\/upload/, uploadImage)
Mock.mock(/\/message\/init/, getMessageInit)
Mock.mock(/\/message\/content/, getContentByMsgId)
Mock.mock(/\/message\/has_read/, hasRead)
Mock.mock(/\/message\/remove_readed/, removeReaded)
Mock.mock(/\/message\/restore/, restoreTrash)
Mock.mock(/\/message\/count/, messageCount)
Mock.mock(/\/get_org_data/, getOrgData)
Mock.mock(/\/get_tree_select_data/, getTreeSelectData)
// Mock.mock(/\/uaa\/sys\/users/, 'get', getUserList)
// Mock.mock(/\/uaa\/sys\/user/, 'post', saveUser)
// Mock.mock(/\/uaa\/sys\/user/, 'delete', delUser)
// Mock.mock(/\/uaa\/sys\/groups/, getRoleList)
// Mock.mock(/\/uaa\/sys\/resources/, 'get', getResources)
// Mock.mock(/\/uaa\/sys\/units/, 'get', getUnitTree)
//
// Mock.mock(/\/uaa\/sys\/dict-categories/, 'get', getDictCategory)
// Mock.mock(/\/uaa\/sys\/dicts/, 'get', getDicts)

export default Mock
