<template>
  <div>
    <form-create ref="fc" v-model="fApi" :rule="rule" :option="option"></form-create>
    <Button @click="handleSearch" type="primary" icon="md-search">搜索</Button>
  </div>
</template>

<script>
// import { maker } from 'form-create'
export default {
  data () {
    return {
      fApi: {},
      model: {},
      // 表单生成规则
      rule: this.config(),
      // 组件参数配置
      option: {
        // 表单提交事件
        onSubmit: function (formData) {
          alert(JSON.stringify(formData))
        },
        submitBtn: {
          show: false
        }
      }
    }
  },
  mounted () {
    this.model = this.fApi
    console.log(this.$route)
  },
  methods: {
    handleSearch () {
      this.fApi.submit((formData) => {
        alert(JSON.stringify(formData))
      })
    },
    config () {
      return [
        {
          type: 'hidden',
          field: 'id',
          value: '14'
        },
        {
          type: 'cascader',
          title: '所在区域',
          field: 'address',
          col: {
            span: 12,
            labelWidth: 150
          },
          value: ['陕西省', '西安市', '新城区']
        },
        {
          type: 'input',
          title: '商品名称',
          field: 'goods_name',
          value: '',
          col: {
            span: 12,
            labelWidth: 150
          },
          validate: [{
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }]
        }
      ]
    }
  }
}
</script>
<style>
  .btn{
    float:right;
  }
</style>
