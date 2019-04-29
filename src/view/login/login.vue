<style lang="less">
  @import './login.less';
  .icon-icon-qrcode{
    font-size: 40px;
    position: absolute;
    z-index: 99;
    top: -5px;
    right: 10px;
    color: #999;
  }
  .icon-pc{
    font-size: 32px;
    position: absolute;
    z-index: 99;
    top: 0px;
    right: 10px;
    color: #999;
  }
  .qr-timeout{
    left: 60px;
    width: 175px;
    height: 175px;
    background: black;
    position: absolute;
    top: 87px;
    opacity: 0.7;
  }
  .qr-refresh{
    margin-top: 53px;
    color: white;
  }
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div v-if="this.loginMethod === 1">
          <i class="icon iconfont icon-icon-qrcode" v-on:click="changeLoginMethod(2)"></i>
        </div>
        <div v-else>
          <i class="icon iconfont icon-pc" v-on:click="changeLoginMethod(1)"></i>
        </div>
        <div class="form-con" v-if="this.loginMethod === 1">
          <Alert type="error" v-if="showErr" closable>{{errMsg}}</Alert>
          <login-form @on-success-valid="handleSubmit" :login-loading="loading"></login-form>
          <p class="login-tip">
          </p>
        </div>
        <div class="form-con" v-else>
          <img :src="qrcode" />
          <div v-if="this.count > 5" class="qr-timeout">
            <div class="qr-refresh" v-on:click="refreshQrCode"><Icon type="md-refresh" size="64" /></div>
          </div>
          <div>{{message}}</div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import { qrLogin, getTicket } from '@/api/user'
const retryCount = 5
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      loading: false,
      showErr: false,
      errMsg: '用户名密码出错',
      loginMethod: 1,
      timestamp: 1111,
      ticket: '',
      qrcode: '',
      message: '',
      count: 1
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'handleQrLogin'
    ]),
    refreshQrCode () {
      this.count = 1
      this.changeLoginMethod(2)
    },
    fetchQrLogin (ticket, timestamp) {
      if (this.count <= retryCount) {
        qrLogin(ticket, timestamp).then(res => {
          this.count = this.count + 1
          const { data: { code, ext } } = res
          // 超时
          if (code === 408) {
            this.fetchQrLogin(ticket, timestamp)
          }
          if (code === 201) {
            this.message = '扫码成功'
            this.fetchQrLogin(ticket, timestamp)
          }
          if (code === 200) {
            this.message = '登陆成功'
            let token = JSON.parse(ext)
            this.handleQrLogin({ token })
            this.getUserInfo().then(res => {
              this.loading = false
              this.$router.push({
                name: this.$config.homeName
              })
            }).catch(_ => {
              this.loading = false
              this.showErr = true
            })
          }
        })
      } else {
        this.message = '二维码超时'
      }
    },
    changeLoginMethod (type) {
      this.loginMethod = type
      if (this.loginMethod === 2) {
        getTicket().then(resp => {
          const { data: { retCode, result: { ticket, _t } } } = resp
          if (retCode === '000') {
            this.ticket = ticket
            this.timestamp = _t
            this.qrcode = `http://192.168.2.31:7400/api/wechat/show-code?ticket=${ticket}&_t=${_t}`
            this.fetchQrLogin(ticket, _t)
          }
        })
      }
    },
    handleSubmit ({ userName, password }) {
      this.showErr = false
      this.loading = true
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.loading = false
          this.$router.push({
            name: this.$config.homeName
          })
        }).catch(_ => {
          this.loading = false
          this.showErr = true
        })
      }).catch(_ => {
        this.showErr = true
        this.loading = false
      })
    }
  }
}
</script>
