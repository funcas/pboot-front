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
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :loading="loading" border :columns="columns" :data="data" ref="table"></Table>
                    </Row>
                    <Row type="flex" justify="end" class="code-row-bg page">
                        <Page :current="this.searchForm.pageNumber" :total="total" :page-size="this.searchForm.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer></Page>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { getOperLogs } from '@/api/operLog'
export default {
  name: 'oper-log',
  data () {
    return {
      loading: true,
      searchForm: {
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '路径',
          key: 'operatingTarget',
          width: 160
        },
        {
          title: '账号',
          key: 'username',
          width: 160
        },
        {
          title: '功能',
          key: 'func',
          width: 160
        },
        {
          title: '模块',
          key: 'module',
          width: 120
        },
        {
          title: '开始时间',
          key: 'startDate',
          width: 180
        },
        {
          title: '结束时间',
          key: 'endDate',
          width: 180
        },
        {
          title: '结果',
          key: 'stateName',
          width: 120
        },
        {
          title: '备注',
          key: 'remark',
          ellipsis: true,
          tooltip: true,
          width: 200
        }
      ],
      data: [],
      total: 0
    }
  },
  methods: {
    init () {
      this.fetchOperLogs()
    },
    changePage (v) {
      this.searchForm.pageNumber = v
      this.fetchOperLogs()
    },
    changePageSize (v) {
      this.searchForm.pageSize = v
      this.fetchOperLogs()
    },
    fetchOperLogs () {
      getOperLogs(this.searchForm).then(res => {
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
    }
  },
  mounted () {
    this.init()
  }

}
</script>
