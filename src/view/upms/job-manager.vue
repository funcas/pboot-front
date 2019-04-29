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
                        <Button @click="addJob" type="primary" icon="md-add">添加定时器</Button>
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
        <Modal :title="modalTitle" v-model="jobModalVisible" :mask-closable='false' :width="600">
            <Form ref="jobForm" :model="jobForm" :label-width="70" :rules="jobFormValidate">
                <FormItem label="类名称" prop="jobClassName">
                    <Input v-model="jobForm.jobClassName"/>
                </FormItem>
                <FormItem label="cron表达式" prop="cronExpression">
                    <Input v-model="jobForm.cronExpression"/>
                </FormItem>
                <FormItem label="参数" prop="parameter">
                    <Input v-model="jobForm.parameter"/>
                </FormItem>
                <FormItem label="备注" prop="remark">
                    <Input type="textarea" v-model="jobForm.remark" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelJob">取消</Button>
                <Button type="primary" :loading="submitLoading" @click="submitJob">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { getJobList, saveJob, startJob, stopJob } from '@/api/jobs'
export default {
  name: 'job-manager',
  data () {
    return {
      loading: true,
      selectCount: 0,
      selectList: [],
      searchForm: {
        pageNumber: 1,
        pageSize: 10
      },
      fieldTypes: [],
      categories: [],
      modalType: 0,
      jobModalVisible: false,
      modalTitle: '',
      jobForm: {
      },
      jobFormValidate: {
        jobClassName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
      },
      submitLoading: false,
      columns: [
        // {
        //   type: 'selection',
        //   width: 60,
        //   align: 'center'
        // },
        {
          title: '类名称',
          key: 'jobClassName',
          ellipsis: true,
          tooltip: true,
          width: 230
        },
        {
          title: 'cron',
          key: 'cronExpression',
          width: 130
        },
        {
          title: '参数',
          key: 'parameter',
          width: 100
        },
        {
          title: '状态',
          key: 'jobStateName',
          width: 120
        },
        {
          title: '备注',
          key: 'remark',
          ellipsis: true,
          tooltip: true,
          width: 200
        },
        {
          title: '操作',
          key: 'action',
          width: 220,
          align: 'center',
          fixed: 'right',
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
                    type: params.row.state === 3 ? 'success' : 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.startOrStop(params.row)
                    }
                  }
                },
                params.row.state === 3 ? '启动' : '停止'
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
      this.getJobs()
    },
    changePage (v) {
      this.searchForm.pageNumber = v
      this.getDicts()
    },
    changePageSize (v) {
      this.searchForm.pageSize = v
      this.getDicts()
    },
    getJobs () {
      getJobList(this.searchForm).then(res => {
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
    cancelJob () {
      this.jobModalVisible = false
    },
    submitJob () {
      this.$refs.jobForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          saveJob(this.jobForm).then(res => {
            this.submitLoading = false
            this.$Message.success('操作成功')
            this.init()
            this.jobModalVisible = false
          })
        }
      })
    },
    addJob () {
      this.modalType = 0
      this.modalTitle = '添加字典类别'
      this.jobForm = {}
      this.jobModalVisible = true
    },
    edit (v) {
      this.modalType = 1
      this.modalTitle = '编辑字典类别'
      let str = JSON.stringify(v)
      let jobInfo = JSON.parse(str)
      this.jobForm = jobInfo
      this.jobModalVisible = true
    },
    startOrStop (v) {
      if (v.state === 3) {
        startJob(v.id).then(res => {
          this.$Message.success('启动成功')
          this.init()
        })
      }
      if (v.state === 1) {
        stopJob(v.id).then(res => {
          this.$Message.success('停止成功')
          this.init()
        })
      }
    }
  },
  mounted () {
    this.init()
    // this.loadCategories()
  }

}
</script>
