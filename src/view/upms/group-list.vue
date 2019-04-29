<template>
    <div class="search">
        <Row>
            <Col>
                <Card>
                    <Row>
                        <Form ref="searchForm" :model="searchForm" inline :label-width="70" class="search-form">
                            <Form-item label="组名称" prop="name">
                                <Input type="text" v-model="searchForm.name" placeholder="组名称" style="width: 200px"/>
                            </Form-item>
                            <Form-item style="margin-left:-35px;">
                              <Button @click="handleSearch" type="primary" icon="md-search">搜索</Button>
                              <Button @click="handleReset" >重置</Button>
                            </Form-item>
                        </Form>
                    </Row>
                    <Row class="operation">
                        <Button @click="addGroup" type="primary" icon="md-add" v-hasPerms="{code:'group:edit'}">添加组</Button>
                        <!-- <Button @click="delAll">批量删除</Button> -->
                    </Row>
                    <!-- <Row>
                        <Alert show-icon>
                            已选择 <span class="select-count">{{selectCount}}</span> 项
                            <a class="select-clear" @click="clearSelectAll">清空</a>
                        </Alert>
                    </Row> -->
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :loading="loading" border :columns="columns" :data="data" @on-selection-change="showSelect" ref="table"></Table>
                        <!-- <Table :columns="columns" :data="exportData" ref="exportTable" style="display:none"></Table> -->
                    </Row>
                    <Row type="flex" justify="end" class="code-row-bg page">
                        <Page :current="this.searchForm.pageNumber" :total="total" :page-size="this.searchForm.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer></Page>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Modal :title="modalTitle" v-model="groupModalVisible" :mask-closable='false' :width="700">
            <Form ref="groupForm" :model="groupForm" :label-width="70" :rules="groupFormValidate">
                <FormItem label="组名称" prop="name">
                    <Input v-model="groupForm.name"/>
                </FormItem>
                <Form-item label="备注" prop="remark">
                    <Input type="textarea" v-model="groupForm.remark" />
                </Form-item>
                <Row :gutter="32" style="padding: 10px;">
                  <Col :span="12">
                    <fieldset style="padding: 10px;border:1px solid #dcdee2;">
                      <legend><div style="font-size:12px;padding:0 10px 0 10px;">菜单权限</div> </legend>
                      <Tree :data="menuData" show-checkbox ref="menuTree" multiple></Tree>
                    </fieldset>
                  </Col>
                  <Col :span="12">
                    <fieldset style="padding: 10px;border:1px solid #dcdee2;">
                      <legend><div style="font-size:12px;padding:0 10px 0 10px;">数据权限</div> </legend>
                      <Form-item label="用户状态" prop="status">
                          <Select v-model="groupForm.dataScope" placeholder="请选择" @on-change="dsChange" style="width: 200px">
                              <Option :value="0">全部</Option>
                              <Option :value="1">部门及下属部门</Option>
                              <Option :value="2">本部</Option>
                              <Option :value="3">个人</Option>
                              <Option :value="9">自定义</Option>
                              <Option :value="99">无</Option>
                          </Select>
                      </Form-item>
                      <Tree v-if="showUnitTree" :data="unitData" show-checkbox ref="unitTree"></Tree>
                    </fieldset>
                  </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelGroup">取消</Button>
                <Button type="primary" :loading="submitLoading" @click="submitGroup" v-hasPerms="{code:'group:save'}">提交</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { getMenuByGroupId } from '@/api/resource'
import { getUnitByGroupId } from '@/api/unit'
import { saveGroup, getGroups, delGroup } from '@/api/group'
export default {
  name: 'group-manage',
  data () {
    return {
      loading: true,
      menuData: [],
      unitData: [],
      selectCount: 0,
      selectList: [],
      showUnitTree: false,
      searchForm: {
        name: '',
        state: 1,
        pageNumber: 1,
        pageSize: 10,
        sort: 'createTime'
      },
      modalType: 0,
      groupModalVisible: false,
      modalTitle: '',
      groupForm: {},
      errorPass: '',
      groupFormValidate: {
        name: [
          { required: true, message: '组名称不能为空', trigger: 'blur' }
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
          title: '名称',
          key: 'name',
          width: 180,
          sortable: false
        },
        {
          title: '备注',
          key: 'remark',
          ellipsis: true,
          tooltip: true,
          sortable: false
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
      this.getGroupList()
    },
    getUnitList (id) {
      // if (!id) {
      //   id = -99
      // }
      getUnitByGroupId(id).then(res => {
        let { data: { result } } = res
        result.forEach(e => {
          e.expand = true
        })
        this.unitData = result
      })
    },
    changePage (v) {
      this.searchForm.pageNumber = v
      this.getGroupList()
    },
    changePageSize (v) {
      this.searchForm.pageSize = v
      this.getGroupList()
    },
    dsChange (v) {
      if (v === 9) {
        this.showUnitTree = true
      } else {
        this.showUnitTree = false
      }
    },
    getGroupList () {
      getGroups(this.searchForm).then(res => {
        const { data } = res
        this.loading = false
        this.data = data.result.records
        this.total = data.result.total
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
    cancelGroup () {
      this.groupModalVisible = false
    },
    submitGroup () {
      this.$refs.groupForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          let checkedGroup = this.$refs.menuTree.getCheckedAndIndeterminateNodes()
          let resourceIds = []
          let unitIds = []
          // 若是自定义权限，处理组织机构树数据
          if (this.groupForm.dataScope === 9) {
            let checkedUnit = this.$refs.unitTree.getCheckedNodes()
            if (checkedUnit.length > 0) {
              checkedUnit.forEach(i => {
                if (i.parentId !== 0) {
                  unitIds.push(i.id)
                }
              })
            }
          }
          if (checkedGroup.length > 0) {
            checkedGroup.forEach(i => {
              resourceIds.push(i.id)
            })
          }
          this.groupForm.resourceIds = resourceIds
          this.groupForm.unitIds = unitIds
          saveGroup(this.groupForm).then(res => {
            this.submitLoading = false
            this.$Message.success('操作成功')
            this.init()
            this.groupModalVisible = false
          })
        }
      })
    },
    addGroup () {
      this.modalType = 0
      this.modalTitle = '添加组'
      this.groupForm = {
        sex: 1,
        roles: []
      }
      getMenuByGroupId(-1).then(res => {
        const { data: { result } } = res
        result.forEach(e => {
          e.expand = true
        })
        this.menuData = result
      })
      this.getUnitList(-99)
      this.groupModalVisible = true
    },
    edit (v) {
      this.modalType = 1
      this.modalTitle = '编辑组'
      // 转换null为''
      for (let attr in v) {
        if (v[attr] === null) {
          v[attr] = ''
        }
      }
      let str = JSON.stringify(v)
      let groupInfo = JSON.parse(str)
      this.groupForm = groupInfo
      getMenuByGroupId(v.id).then(res => {
        const { data } = res
        data.result.forEach(e => {
          e.expand = true
        })
        this.menuData = data.result
      })
      if (v.dataScope === 9) {
        this.showUnitTree = true
      } else {
        this.showUnitTree = false
      }
      this.getUnitList(v.id)
      this.groupModalVisible = true
    },
    remove (v) {
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除组 【' + v.name + '】? 这将会引起关联用户被删除，请慎重操作！',
        onOk: () => {
          delGroup(v.id).then(res => {
            this.$Message.success('删除成功')
            this.init()
          })
        }
      })
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
          let ids = ''
          this.selectList.forEach(function (e) {
            ids += e.id + ','
          })
          ids = ids.substring(0, ids.length - 1)
          delUser({ ids: ids }).then(res => {
            this.$Message.success('删除成功')
            this.init()
          })
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
