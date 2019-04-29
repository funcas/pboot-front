<template>
    <div class="search">
        <Card>
          <Row class="operation">
            <Button @click="addMenu" type="primary">添加菜单</Button>
            <!-- <Button @click="delAll">批量删除</Button> -->
            <Button @click="getMenuList">刷新</Button>
          </Row>
          <Row type="flex" justify="start" class="code-row-bg">
            <Col span="6" class="menu-border">
              <Tree :data="data" show-checkbox @on-check-change="changeSelect" @on-select-change="selectTree"></Tree>
              <Spin size="large" fix v-if="loading"></Spin>
            </Col>
            <Col span="16">
              <Form ref="menuForm" :model="menuForm" :label-width="80" :rules="menuFormValidate">
                <!-- <FormItem label="菜单ID" prop="id">
                    <Input v-model="menuForm.id" readonly />
                </FormItem> -->
                <FormItem label="菜单名称" prop="name">
                    <Input v-model="menuForm.name"/>
                </FormItem>
                <FormItem label="路径" prop="value">
                    <Input v-model="menuForm.value"/>
                </FormItem>
                <Form-item label="类型" prop="type">
                    <Select v-model="menuForm.type" placeholder="请选择">
                        <Option :value="1">菜单权限</Option>
                        <Option :value="2">按钮权限</Option>
                    </Select>
                </Form-item>
                <FormItem label="上级菜单" prop="fkParentId">
                    <treeselect v-model="menuForm.fkParentId" :options="data"  placeholder="上级菜单"/>
                </FormItem>
                <FormItem label="排序" prop="sort">
                  <Input v-model="menuForm.sort"></Input>
                </FormItem>
                <FormItem label="权限代码" prop="permission">
                  <Input v-model="menuForm.permission"></Input>
                </FormItem>
                <Form-item>
                  <Button @click="submitEdit" :loading="submitLoading" type="primary">保存</Button>
                </Form-item>
              </Form>
            </Col>
          </Row>
        </Card>
    </div>
</template>

<script>
import { getMenuList, saveMenu } from '@/api/resource'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'menu-manage',
  components: {
    Treeselect
  },
  data () {
    return {
      loading: true,
      modalType: 0,
      selectList: [],
      selectCount: 0,
      menuForm: {
        name: '',
        type: 1,
        permission: null
      },
      isChild: true,
      isChildAdd: true,
      errorParent: '',
      errorParentAdd: '',
      menuFormValidate: {
        name: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        type: [{ required: true, type: 'number', message: '类型不能为空', trigger: 'change' }]
      },
      submitLoading: false,
      data: []
    }
  },
  methods: {
    init () {
      this.getMenuList()
    },
    getMenuList () {
      this.loading = true
      getMenuList().then(res => {
        const { data } = res
        this.loading = false
        data.result.forEach(e => {
          e.expand = true
        })
        this.data = data.result
      })
    },
    selectTree (v) {
      if (v.length > 0) {
        let str = JSON.stringify(v[0])
        let menu = JSON.parse(str)
        if (menu.access === '') {
          menu.access = null
        }
        this.menuForm = menu
        this.changeParent()
      }
    },
    changeParent () {
      if (this.menuForm.parent) {
        this.isChild = false
      } else {
        this.isChild = true
      }
    },
    changeParentAdd () {
      if (this.menuFormAdd.parent) {
        this.isChildAdd = false
      } else {
        this.isChildAdd = true
      }
    },
    handleReset () {
      this.$refs.menuForm.resetFields()
    },
    submitEdit () {
      this.$refs.menuForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          saveMenu(this.menuForm).then(res => {
            this.submitLoading = false
            this.$Message.success('添加成功')
            this.init()
            this.menuForm = {
              type: 1
            }
          })
        }
      })
    },
    addMenu () {
      this.menuForm = {
        name: '',
        permission: null
      }
    },
    changeSelect (v) {
      this.selectCount = v.length
      this.selectList = v
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
          this.selectList.forEach(e => {
            ids += e.id + ','
          })
          ids = ids.substring(0, ids.length - 1)
          this.deleteRequest('/menu/delByIds', { ids: ids }).then(res => {
            if (res.success === true) {
              this.$Message.success('删除成功')
              this.init()
            }
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
