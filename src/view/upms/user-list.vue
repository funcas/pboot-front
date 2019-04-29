<template>
    <div class="search">
        <Row>
            <Col>
                <Card>
                    <Row>
                        <Form ref="searchForm" :model="searchForm" inline :label-width="70" class="search-form">
                            <Form-item label="用户名称" prop="username">
                                <Input type="text" v-model="searchForm.filter_S_username" placeholder="请输入用户名" style="width: 200px"/>
                            </Form-item>
                            <Form-item label="手机号" prop="phone">
                                <Input type="text" v-model="searchForm.filter_S_phone" placeholder="请输入手机号" style="width: 200px"/>
                            </Form-item>
                            <span v-if="drop">
                              <Form-item label="昵称" prop="nickname">
                                  <Input type="text" v-model="searchForm.filter_S_nickname" placeholder="请输入昵称" style="width: 200px"/>
                              </Form-item>
                              <Form-item label="用户状态" prop="status">
                                  <Select v-model="searchForm.filter_I_state" placeholder="请选择" style="width: 200px">
                                      <Option value="1">正常</Option>
                                      <Option value="0">禁用</Option>
                                  </Select>
                              </Form-item>
                              <!-- <Form-item label="aa">
                                  <u-tree-select :tree="tree" style="width: 200px"></u-tree-select>
                              </Form-item> -->
                            </span>
                            <Form-item style="margin-left:-35px;">
                              <Button @click="handleSearch" type="primary" icon="md-search">搜索</Button>
                              <Button @click="handleReset" >重置</Button>
                              <a class="drop-down" @click="dropDown">{{dropDownContent}}
                                <Icon :type="dropDownIcon"></Icon>
                              </a>
                            </Form-item>
                        </Form>
                    </Row>
                    <Row class="operation">
                        <Button @click="addUser" type="primary" icon="md-add" v-hasPerms="{code:'user:edit'}">添加用户</Button>
                        <Button @click="delAll" icon="md-trash" v-hasPerms="{code:'user:delete'}">批量删除</Button>
                    </Row>
                    <!-- <Row>
                        <Alert show-icon>
                            已选择 <span class="select-count">{{selectCount}}</span> 项
                            <a class="select-clear" @click="clearSelectAll">清空</a>
                        </Alert>
                    </Row> -->
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :loading="loading" border :columns="columns" :data="data" @on-selection-change="showSelect" ref="table"></Table>
                        <Table :columns="columns" :data="exportData" ref="exportTable" style="display:none"></Table>
                    </Row>
                    <Row type="flex" justify="end" class="code-row-bg page">
                        <Page :current="this.searchForm.pageNumber" :total="total" :page-size="this.searchForm.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer></Page>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Modal :title="modalTitle" v-model="userModalVisible" :mask-closable='false' :width="800">
            <Form ref="userForm" :model="userForm" :label-width="70" :rules="userFormValidate">
              <Row>
                <Col :span="12">
                  <FormItem label="用户名" prop="username">
                      <Input v-model="userForm.username" :readonly="modalType === 0 ? false : 'readonly'"/>
                  </FormItem>
                </Col>
                <Col :span="12">
                  <FormItem label="昵称" prop="nickname">
                      <Input v-model="userForm.nickname"/>
                  </FormItem>
                </Col>
                <Col :span="12">
                  <FormItem label="密码" prop="password" :error="errorPass">
                      <Input type="password" v-model="userForm.password" :placeholder="modalType === 0 ? '' : '不修改密码请放空'"/>
                  </FormItem>
                </Col>
                <Col :span="12">
                  <FormItem label="邮箱" prop="email">
                      <Input v-model="userForm.email"/>
                  </FormItem>
                </col>
                <Col :span="12">
                <FormItem label="手机号" prop="phone">
                    <Input v-model="userForm.phone"/>
                </FormItem>
                </Col>
                <Col :span="12">
                <FormItem label="性别" prop="sex">
                  <RadioGroup v-model="userForm.sex">
                    <Radio :label="1">男</Radio>
                    <Radio :label="0">女</Radio>
                  </RadioGroup>
                </FormItem>
                </Col>
                <Col :span="12">
                <FormItem label="状态" prop="state">
                  <Select v-model="userForm.state" placeholder="请选择">
                    <Option :value="1">启用</Option>
                    <Option :value="0">停用</Option>
                  </Select>
                </FormItem>
                </col>
                <Col :span="12">
                  <FormItem label="角色分配" prop="groups">
                    <Select v-model="userForm.groups" multiple @on-change="selectRoles">
                        <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col :span="12">
                  <FormItem label="组织机构" prop="unit">
                     <treeselect v-model="userForm.unitId" :options="uData"  placeholder="组织机构"/>
                  </FormItem>
                </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelUser">取消</Button>
                <Button type="primary" :loading="submitLoading" @click="submitUser" v-hasPerms="{code:'user:save'}">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getUserList, getRoleList, delUser, saveUser, delUserBatch } from '@/api/user'
import { getUnits } from '@/api/unit'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: {
    Treeselect
  },
  name: 'user-manage',
  data () {
    const validateMobile = (rule, value, callback) => {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!reg.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return {
      loading: true,
      drop: false,
      dropDownContent: '展开',
      dropDownIcon: 'chevron-down',
      selectCount: 0,
      selectList: [],
      searchForm: {
        filter_S_username: '',
        filter_S_phone: '',
        filter_S_email: '',
        filter_S_sex: '',
        filter_I_state: 1,
        pageNumber: 1,
        pageSize: 10,
        sort: 'createTime'
      },
      uData: [],
      modalType: 0,
      userModalVisible: false,
      modalTitle: '',
      userForm: {
        sex: 1,
        groups: []
      },
      userRoles: [],
      roleList: [],
      errorPass: '',
      userFormValidate: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ],
        state: [
          { required: true, type: 'number', message: '状态不能为空', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式不正确' }
        ]
      },
      submitLoading: false,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'username',
          sortable: true
        },
        {
          title: '手机',
          key: 'phone',
          sortable: true
        },
        {
          title: '邮箱',
          key: 'email',
          sortable: true
        },
        {
          title: '状态',
          key: 'state',
          align: 'center',
          render: (h, params) => {
            if (params.row.state === 1) {
              return h('div', [
                h(
                  'Tag',
                  {
                    props: {
                      color: 'green'
                    }
                  },
                  '正常启用'
                )
              ])
            } else if (params.row.state === 0) {
              return h('div', [
                h(
                  'Tag',
                  {
                    props: {
                      color: 'red'
                    }
                  },
                  '禁用'
                )
              ])
            }
          },
          filters: [
            {
              label: '正常启用',
              value: 1
            },
            {
              label: '禁用',
              value: 0
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.state === 1
            } else if (value === 0) {
              return row.state === 0
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 220,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      data: [],
      exportData: [],
      total: 0
    }
  },
  methods: {
    init () {
      this.getUserList()
      this.getUnitList()
    },
    getUnitList () {
      this.loading = true
      getUnits().then(res => {
        const { data } = res
        this.loading = false
        data.result.forEach(e => {
          e.expand = true
        })
        this.uData = data.result
      })
    },
    changePage (v) {
      this.searchForm.pageNumber = v
      this.getUserList()
    },
    changePageSize (v) {
      this.searchForm.pageSize = v
      this.getUserList()
    },
    getUserList () {
      getUserList(this.searchForm).then(res => {
        console.log(res)
        this.loading = false
        this.data = res.data.result.records
        this.total = res.data.result.total
      })
    },
    handleSearch () {
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      this.init()
    },
    handleReset () {
      this.$refs.searchForm.resetFields()
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      // 重新加载数据
      this.init()
    },
    getRoleList () {
      getRoleList().then(res => {
        this.roleList = res.data.result.records
      })
    },
    selectRoles (v) {},
    cancelUser () {
      this.userModalVisible = false
    },
    submitUser () {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          if (this.modalType === 0) {
            if (!this.userForm.password || this.userForm.password.length < 6) {
              this.errorPass = '密码不能为空且长度不得少于6位'
              return
            }
          }
          this.submitLoading = true
          let groups = []
          this.userForm.groups.forEach(i => {
            groups.push({ id: i })
          })
          this.userForm.groups = groups
          saveUser(this.userForm).then(res => {
            this.submitLoading = false
            this.$Message.success('操作成功')
            this.init()
            this.userModalVisible = false
          })
        }
      })
    },
    addUser () {
      this.modalType = 0
      this.modalTitle = '添加用户'
      this.userForm = {
        sex: 1,
        state: 1,
        groups: []
      }
      this.userModalVisible = true
    },
    edit (v) {
      this.modalType = 1
      this.modalTitle = '编辑用户'
      let str = JSON.stringify(v)
      let userInfo = JSON.parse(str)
      this.userForm = userInfo
      let selectRolesId = []
      this.userForm.groups.forEach(e => {
        selectRolesId.push(e.id)
      })
      this.userForm.groups = selectRolesId

      this.userModalVisible = true
    },
    remove (v) {
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除用户 ' + v.username + ' ?',
        onOk: () => {
          delUser(v.id).then(res => {
            let { data: { retCode } } = res
            if (retCode === '000') {
            }
            this.$Message.success('删除成功')
            this.init()
          })
        }
      })
    },
    dropDown () {
      if (this.drop) {
        this.dropDownContent = '展开'
        this.dropDownIcon = 'chevron-down'
      } else {
        this.dropDownContent = '收起'
        this.dropDownIcon = 'chevron-up'
      }
      this.drop = !this.drop
    },
    showSelect (e) {
      this.exportData = e
      this.selectList = e
      this.selectCount = e.length
    },
    clearSelectAll () {
      this.$refs.table.selectAll(false)
    },
    delAll () {
      if (this.selectCount <= 0) {
        this.$Message.warning('您还未选择要删除的数据')
        return
      }
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所选的 ' + this.selectCount + ' 条数据?',
        onOk: () => {
          let ids = []
          this.selectList.forEach(function (e) {
            ids.push(e.id)
          })
          delUserBatch(ids).then(res => {
            this.$Message.success('删除成功')
            this.init()
          })
        }
      })
    }
  },
  mounted () {
    this.init()
    this.getRoleList()
  }
}
</script>
