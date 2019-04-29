<template>
    <div class="search">
        <Row>
            <Col>
                <Card>
                    <Row>
                        <Form ref="searchForm" :model="searchForm" inline :label-width="70" class="search-form">
                            <Form-item label="名称" prop="name">
                                <Input type="text" v-model="searchForm.name" placeholder="名称" style="width: 200px"/>
                            </Form-item>
                            <Form-item style="margin-left:-35px;">
                              <Button @click="handleSearch" type="primary" icon="md-search">搜索</Button>
                              <Button @click="handleReset" >重置</Button>
                            </Form-item>
                        </Form>
                    </Row>
                    <Row class="operation">
                        <Button @click="addDict" type="primary" icon="md-add" v-hasPerms="{code:'dictionary-category:edit'}">添加字典类别</Button>
                        <!-- <Button @click="delAll" icon="trash-a">批量删除</Button> -->
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :loading="loading" border :columns="columns" :data="data" @on-selection-change="showSelect" ref="table"></Table>
                    </Row>
                    <Row type="flex" justify="end" class="code-row-bg page">
                        <Page :current="this.searchForm.pageNumber" :total="total" :page-size="this.searchForm.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer></Page>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Modal :title="modalTitle" v-model="dictModalVisible" :mask-closable='false' :width="500">
            <Form ref="dictForm" :model="dictForm" :label-width="70" :rules="dictFormValidate">
              <Row>
                <FormItem label="名称" prop="name">
                    <Input v-model="dictForm.name"/>
                </FormItem>
                <FormItem label="编码" prop="code">
                    <Input v-model="dictForm.code"/>
                </FormItem>
                <FormItem label="备注" prop="remark">
                    <Input type="textarea" v-model="dictForm.remark"/>
                </FormItem>
              </Row>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelDict">取消</Button>
                <Button type="primary" :loading="submitLoading" @click="submitDict" v-hasPerms="{code:'dictionary-category:save'}">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getDictCategory, saveDictCategory } from '@/api/dict'
export default {
  name: 'dict-category',
  data () {
    return {
      loading: true,
      selectCount: 0,
      selectList: [],
      searchForm: {
        username: '',
        phone: '',
        email: '',
        sex: '',
        state: 1,
        pageNumber: 1,
        pageSize: 10,
        sort: 'createTime'
      },
      modalType: 0,
      dictModalVisible: false,
      modalTitle: '',
      dictForm: {
        sex: 1,
        groups: []
      },
      dictFormValidate: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '编码不能为空', trigger: 'blur' }
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
          key: 'name'
        },
        {
          title: '备注',
          key: 'remark',
          ellipsis: true,
          tooltip: true
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
      total: 0
    }
  },
  methods: {
    init () {
      this.getDictCategoryList()
    },
    changePage (v) {
      this.searchForm.pageNumber = v
      this.getDictCategoryList()
    },
    changePageSize (v) {
      this.searchForm.pageSize = v
      this.getDictCategoryList()
    },
    getDictCategoryList () {
      getDictCategory(this.searchForm).then(res => {
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
    showSelect (e) {
      this.selectList = e
      this.selectCount = e.length
    },
    cancelDict () {
      this.dictModalVisible = false
    },
    submitDict () {
      this.$refs.dictForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          saveDictCategory(this.dictForm).then(res => {
            this.submitLoading = false
            this.$Message.success('操作成功')
            this.init()
            this.dictModalVisible = false
          })
        }
      })
    },
    addDict () {
      this.modalType = 0
      this.modalTitle = '添加字典类别'
      this.userForm = {}
      this.dictModalVisible = true
    },
    edit (v) {
      this.modalType = 1
      this.modalTitle = '编辑字典类别'
      let str = JSON.stringify(v)
      let dictInfo = JSON.parse(str)
      this.dictForm = dictInfo
      this.dictModalVisible = true
    }
  },
  mounted () {
    this.init()
  }

}
</script>
