<template>
    <div class="search">
        <Card>
          <Row class="operation">
            <Button @click="addMenu" type="primary" icon="md-add">添加机构</Button>
            <!-- <Button @click="delAll" icon="trash-a">批量删除</Button> -->
            <Button @click="getUnitList" icon="md-refresh">刷新</Button>
          </Row>
          <Row type="flex" justify="start" class="code-row-bg">
            <Col span="6" class="menu-border">
              <Tree :data="data" show-checkbox @on-check-change="changeSelect" @on-select-change="selectTree"></Tree>
              <Spin size="large" fix v-if="loading"></Spin>
            </Col>
            <Col span="18">
              <Form ref="unitForm" :model="unitForm" :label-width="80" :rules="menuFormValidate">
                <FormItem label="名称" prop="name">
                    <Input v-model="unitForm.name"/>
                </FormItem>
                <FormItem label="上级机构" prop="parentId">
                    <treeselect v-model="unitForm.parentId" :options="data"  placeholder="上级机构"/>
                </FormItem>
                <FormItem label="地址" prop="address">
                    <Input v-model="unitForm.address"/>
                </FormItem>
                <FormItem label="负责人" prop="master">
                    <Input v-model="unitForm.master"/>
                </FormItem>
                <FormItem label="机构编码" prop="code">
                    <Input v-model="unitForm.code"/>
                </FormItem>
                <FormItem label="排序" prop="sort">
                  <Input v-model="unitForm.sort"/>
                </FormItem>
                <Form-item>
                  <Button @click="submitSave" :loading="submitLoading" type="primary" icon="md-checkmark" v-hasPerms="{code:'unit:save'}">保存</Button>
                  <Button @click="handleReset">重置</Button>
                </Form-item>
              </Form>
            </Col>
          </Row>
        </Card>
    </div>
</template>

<script>
import { getUnits, saveUnit } from '@/api/unit'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'role-manage',
  components: {
    Treeselect
  },
  data () {
    return {
      loading: true,
      selectList: [],
      selectCount: 0,
      unitForm: {
        name: '',
        parentId: null,
        delFlag: 0,
        state: 1
      },
      menuFormValidate: {
        name: [
          { required: true, message: '单位名称不能为空', trigger: 'blur' }
        ]
      },
      submitLoading: false,
      data: []
    }
  },
  methods: {
    init () {
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
        this.data = data.result
      })
    },
    selectTree (v) {
      if (v.length > 0) {
        let str = JSON.stringify(v[0])
        let unit = JSON.parse(str)
        if (unit.parentId === '0') {
          unit.parentId = null
        }
        this.unitForm = unit
      }
    },
    handleReset () {
      this.$refs.unitForm.resetFields()
    },
    submitSave () {
      this.$refs.unitForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          saveUnit(this.unitForm).then(res => {
            this.submitLoading = false
            this.$Message.success('操作成功')
            this.init()
          })
        }
      })
    },
    addMenu () {
      this.handleReset()
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
